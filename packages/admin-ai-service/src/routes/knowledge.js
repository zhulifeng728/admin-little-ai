import express from 'express';
import KnowledgeModel from '../models/Knowledge.js';

const router = express.Router();

// 获取所有知识库
router.get('/', async (req, res) => {
  try {
    const list = await KnowledgeModel.findAll();
    res.json(list);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 获取单个知识库
router.get('/:id', async (req, res) => {
  try {
    const item = await KnowledgeModel.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ error: '未找到' });
    }
    res.json(item);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 创建知识库
router.post('/', async (req, res) => {
  try {
    const id = await KnowledgeModel.create(req.body);
    res.json({ id, message: '创建成功' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 更新知识库
router.put('/:id', async (req, res) => {
  try {
    await KnowledgeModel.update(req.params.id, req.body);
    res.json({ message: '更新成功' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 删除知识库
router.delete('/:id', async (req, res) => {
  try {
    await KnowledgeModel.delete(req.params.id);
    res.json({ message: '删除成功' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
