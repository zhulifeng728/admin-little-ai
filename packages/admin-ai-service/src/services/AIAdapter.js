import axios from 'axios';

class AIAdapter {
  constructor(config) {
    this.provider = config.provider;
    this.apiKey = config.api_key;
    this.baseUrl = config.base_url;
    this.model = config.model;
  }

  async chat(messages) {
    switch (this.provider) {
      case 'openai':
        return await this.chatOpenAI(messages);
      case 'qwen':
        return await this.chatQwen(messages);
      default:
        throw new Error(`不支持的AI服务商: ${this.provider}`);
    }
  }

  async chatOpenAI(messages) {
    try {
      const response = await axios.post(
        `${this.baseUrl}/chat/completions`,
        {
          model: this.model || 'gpt-3.5-turbo',
          messages: messages,
          temperature: 0.7
        },
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json'
          }
        }
      );
      return response.data.choices[0].message.content;
    } catch (error) {
      console.error('OpenAI API调用失败:', error.response?.data || error.message);
      throw new Error('AI服务调用失败');
    }
  }

  async chatQwen(messages) {
    // 通义千问API实现（待补充具体API格式）
    try {
      const response = await axios.post(
        `${this.baseUrl}/chat/completions`,
        {
          model: this.model || 'qwen-turbo',
          messages: messages
        },
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json'
          }
        }
      );
      return response.data.choices[0].message.content;
    } catch (error) {
      console.error('通义千问API调用失败:', error.response?.data || error.message);
      throw new Error('AI服务调用失败');
    }
  }
}

export default AIAdapter;
