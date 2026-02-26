import express from 'express';
import AIModel from '../models/AIModel.js';

const router = express.Router();

// 获取所有模型配置
router.get('/', async (req, res) => {
  try {
    const list = await AIModel.findAll();
    // 隐藏API密钥
    const safeList = list.map(item => ({
      ...item,
      api_key: item.api_key ? '***' : ''
    }));
    res.json(safeList);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 获取单个模型配置
router.get('/:id', async (req, res) => {
  try {
    const item = await AIModel.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ error: '未找到' });
    }
    res.json(item);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 创建模型配置
router.post('/', async (req, res) => {
  try {
    const id = await AIModel.create(req.body);
    res.json({ id, message: '创建成功' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 更新模型配置
router.put('/:id', async (req, res) => {
  try {
    await AIModel.update(req.params.id, req.body);
    res.json({ message: '更新成功' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 删除模型配置
router.delete('/:id', async (req, res) => {
  try {
    await AIModel.delete(req.params.id);
    res.json({ message: '删除成功' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 设置启用状态
router.post('/:id/activate', async (req, res) => {
  try {
    await AIModel.setActive(req.params.id);
    res.json({ message: '设置成功' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
