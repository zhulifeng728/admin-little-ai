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

export default router;
