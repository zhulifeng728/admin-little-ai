import db from '../config/database.js';

class AIModel {
  // 获取所有模型
  static async findAll() {
    const [rows] = await db.query('SELECT * FROM ai_models ORDER BY created_at DESC');
    return rows;
  }

  // 获取启用的模型
  static async findActive() {
    const [rows] = await db.query('SELECT * FROM ai_models WHERE is_active = 1 LIMIT 1');
    return rows[0];
  }

  // 根据ID获取
  static async findById(id) {
    const [rows] = await db.query('SELECT * FROM ai_models WHERE id = ?', [id]);
    return rows[0];
  }

  // 创建模型配置
  static async create(data) {
    const { name, provider, api_key, base_url, model, is_active } = data;
    const [result] = await db.query(
      'INSERT INTO ai_models (name, provider, api_key, base_url, model, is_active) VALUES (?, ?, ?, ?, ?, ?)',
      [name, provider, api_key, base_url, model, is_active || 0]
    );
    return result.insertId;
  }

  // 更新模型配置
  static async update(id, data) {
    const { name, provider, api_key, base_url, model, is_active } = data;
    await db.query(
      'UPDATE ai_models SET name = ?, provider = ?, api_key = ?, base_url = ?, model = ?, is_active = ? WHERE id = ?',
      [name, provider, api_key, base_url, model, is_active, id]
    );
  }

  // 删除模型配置
  static async delete(id) {
    await db.query('DELETE FROM ai_models WHERE id = ?', [id]);
  }

  // 设置启用状态
  static async setActive(id) {
    // 先禁用所有
    await db.query('UPDATE ai_models SET is_active = 0');
    // 启用指定的
    await db.query('UPDATE ai_models SET is_active = 1 WHERE id = ?', [id]);
  }
}

export default AIModel;
