import db from '../config/database.js';

class RouteModel {
  // 获取所有路由
  static async findAll() {
    const [rows] = await db.query('SELECT * FROM routes ORDER BY path');
    return rows;
  }

  // 根据ID获取
  static async findById(id) {
    const [rows] = await db.query('SELECT * FROM routes WHERE id = ?', [id]);
    return rows[0];
  }

  // 创建路由
  static async create(data) {
    const { path, name, description } = data;
    const [result] = await db.query(
      'INSERT INTO routes (path, name, description) VALUES (?, ?, ?)',
      [path, name, description]
    );
    return result.insertId;
  }

  // 更新路由
  static async update(id, data) {
    const { path, name, description } = data;
    await db.query(
      'UPDATE routes SET path = ?, name = ?, description = ? WHERE id = ?',
      [path, name, description, id]
    );
  }

  // 删除路由
  static async delete(id) {
    await db.query('DELETE FROM routes WHERE id = ?', [id]);
  }

  // 搜索路由
  static async search(keyword) {
    const [rows] = await db.query(
      'SELECT * FROM routes WHERE path LIKE ? OR name LIKE ? OR description LIKE ?',
      [`%${keyword}%`, `%${keyword}%`, `%${keyword}%`]
    );
    return rows;
  }
}

export default RouteModel;
