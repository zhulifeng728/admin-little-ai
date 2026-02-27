import db from '../config/database.js';

class KnowledgeModel {
  // 获取所有知识库
  static async findAll() {
    const [rows] = await db.query('SELECT * FROM knowledge_base ORDER BY created_at DESC');
    return rows;
  }

  // 根据ID获取
  static async findById(id) {
    const [rows] = await db.query('SELECT * FROM knowledge_base WHERE id = ?', [id]);
    return rows[0];
  }

  // 创建知识库
  static async create(data) {
    const { title, content, category, related_routes } = data;
    const [result] = await db.query(
      'INSERT INTO knowledge_base (title, content, category, related_routes) VALUES (?, ?, ?, ?)',
      [title, content, category, JSON.stringify(related_routes || [])]
    );
    return result.insertId;
  }

  // 更新知识库
  static async update(id, data) {
    const { title, content, category, related_routes } = data;
    await db.query(
      'UPDATE knowledge_base SET title = ?, content = ?, category = ?, related_routes = ? WHERE id = ?',
      [title, content, category, JSON.stringify(related_routes || []), id]
    );
  }

  // 删除知识库
  static async delete(id) {
    await db.query('DELETE FROM knowledge_base WHERE id = ?', [id]);
  }

  // 关键词搜索（简单实现）
  static async search(keyword) {
    const [rows] = await db.query(
      'SELECT * FROM knowledge_base WHERE title LIKE ? OR content LIKE ?',
      [`%${keyword}%`, `%${keyword}%`]
    );
    return rows;
  }

  // 获取推荐问题
  static async getSuggestedQuestions(route) {
    if (route) {
      // 如果提供了路由，查找相关的知识库条目
      const [rows] = await db.query(
        'SELECT title FROM knowledge_base WHERE JSON_CONTAINS(related_routes, ?) LIMIT 5',
        [JSON.stringify(route)]
      );

      if (rows.length > 0) {
        return rows.map(row => row.title);
      }
    }

    // 如果没有路由或没有找到相关问题，返回通用问题
    const [rows] = await db.query(
      'SELECT title FROM knowledge_base WHERE category = ? ORDER BY created_at DESC LIMIT 5',
      ['guide']
    );

    return rows.map(row => row.title);
  }
}

export default KnowledgeModel;
