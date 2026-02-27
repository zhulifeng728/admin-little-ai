import express from 'express';
import RouteModel from '../models/Route.js';

const router = express.Router();

// 获取所有路由
router.get('/', async (req, res) => {
  try {
    const list = await RouteModel.findAll();
    res.json(list);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 获取单个路由
router.get('/:id', async (req, res) => {
  try {
    const item = await RouteModel.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ error: '未找到' });
    }
    res.json(item);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 创建路由
router.post('/', async (req, res) => {
  try {
    const id = await RouteModel.create(req.body);
    res.json({ id, message: '创建成功' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 更新路由
router.put('/:id', async (req, res) => {
  try {
    await RouteModel.update(req.params.id, req.body);
    res.json({ message: '更新成功' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 删除路由
router.delete('/:id', async (req, res) => {
  try {
    await RouteModel.delete(req.params.id);
    res.json({ message: '删除成功' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 批量导入路由
router.post('/import', async (req, res) => {
  try {
    const { items } = req.body;
    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: '导入数据格式错误' });
    }

    const results = [];
    for (const item of items) {
      try {
        const id = await RouteModel.create(item);
        results.push({ success: true, id, path: item.path });
      } catch (error) {
        results.push({ success: false, path: item.path, error: error.message });
      }
    }

    res.json({
      message: '导入完成',
      total: items.length,
      success: results.filter(r => r.success).length,
      failed: results.filter(r => !r.success).length,
      results
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
