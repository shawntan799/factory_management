# 生产施工管理系统 API 文档

## 基础信息

- **基础URL**: `http://localhost:8080/api`
- **认证方式**: JWT Bearer Token
- **数据格式**: JSON
- **字符编码**: UTF-8

## 认证接口

### 用户登录
```http
POST /auth/login
```

**请求参数:**
```json
{
  "username": "admin",
  "password": "123456"
}
```

**响应示例:**
```json
{
  "code": 200,
  "message": "登录成功",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": 1,
      "username": "admin",
      "realName": "管理员",
      "role": "BOSS",
      "department": "管理部",
      "position": "总经理"
    }
  }
}
```

### 用户登出
```http
POST /auth/logout
```

**请求头:**
```
Authorization: Bearer <token>
```

## 用户管理接口

### 获取用户列表
```http
GET /users?page=1&size=10&role=EMPLOYEE
```

**查询参数:**
- `page`: 页码（默认1）
- `size`: 每页大小（默认10）
- `role`: 角色筛选（BOSS/FINANCE/MANAGER/EMPLOYEE）
- `keyword`: 搜索关键词

**响应示例:**
```json
{
  "code": 200,
  "message": "获取成功",
  "data": {
    "records": [
      {
        "id": 1,
        "username": "zhangsan",
        "realName": "张三",
        "phone": "13800138000",
        "email": "zhangsan@example.com",
        "role": "EMPLOYEE",
        "department": "工程部",
        "position": "施工员",
        "status": 1,
        "createTime": "2024-01-01 10:00:00"
      }
    ],
    "total": 100,
    "pages": 10,
    "current": 1,
    "size": 10
  }
}
```

### 创建用户
```http
POST /users
```

**请求参数:**
```json
{
  "username": "lisi",
  "password": "123456",
  "realName": "李四",
  "phone": "13800138001",
  "email": "lisi@example.com",
  "role": "EMPLOYEE",
  "department": "工程部",
  "position": "施工员"
}
```

### 更新用户
```http
PUT /users/{id}
```

### 删除用户
```http
DELETE /users/{id}
```

## 客户管理接口

### 获取客户列表
```http
GET /customers?page=1&size=10
```

### 创建客户
```http
POST /customers
```

**请求参数:**
```json
{
  "name": "华润置地",
  "type": "房地产开发",
  "contactPerson": "张经理",
  "phone": "13800138888",
  "email": "zhang@cr.com",
  "address": "北京市朝阳区"
}
```

## 项目管理接口

### 获取项目列表
```http
GET /projects?page=1&size=10&status=IN_PROGRESS
```

### 创建项目
```http
POST /projects
```

**请求参数:**
```json
{
  "name": "CBD写字楼幕墙工程",
  "customerId": 1,
  "contractAmount": 2350000.00,
  "startDate": "2024-01-01",
  "endDate": "2024-06-30",
  "managerId": 2,
  "description": "CBD写字楼幕墙安装工程"
}
```

## 成本管理接口

### 获取成本记录
```http
GET /costs?projectId=1&type=MATERIAL&startDate=2024-01-01&endDate=2024-12-31
```

### 创建成本记录
```http
POST /costs
```

**请求参数:**
```json
{
  "projectId": 1,
  "type": "MATERIAL",
  "category": "型材",
  "amount": 50000.00,
  "description": "铝合金型材采购",
  "recordDate": "2024-01-15"
}
```

## 结算管理接口

### 获取结算单列表
```http
GET /settlements?page=1&size=10&status=PENDING
```

### 创建结算单
```http
POST /settlements
```

**请求参数:**
```json
{
  "projectId": 1,
  "amount": 2350000.00,
  "settlementDate": "2024-01-15",
  "remark": "CBD写字楼幕墙工程结算"
}
```

## 数据统计接口

### 获取产值统计
```http
GET /statistics/production?year=2024&month=1
```

**响应示例:**
```json
{
  "code": 200,
  "message": "获取成功",
  "data": {
    "totalAmount": 32580000.00,
    "processingAmount": 18350000.00,
    "constructionAmount": 14230000.00,
    "monthlyData": [
      {
        "month": "1月",
        "total": 2350000.00,
        "processing": 1350000.00,
        "construction": 1000000.00
      }
    ]
  }
}
```

### 获取成本统计
```http
GET /statistics/cost?year=2024&month=1
```

## 错误码说明

| 错误码 | 说明 |
|--------|------|
| 200 | 成功 |
| 400 | 请求参数错误 |
| 401 | 未授权 |
| 403 | 权限不足 |
| 404 | 资源不存在 |
| 500 | 服务器内部错误 |

## 实时通信

### WebSocket连接
```javascript
const ws = new WebSocket('ws://localhost:8080/ws');

// 连接建立
ws.onopen = function() {
  console.log('WebSocket连接已建立');
};

// 接收消息
ws.onmessage = function(event) {
  const data = JSON.parse(event.data);
  console.log('收到消息:', data);
};

// 发送消息
ws.send(JSON.stringify({
  type: 'UPDATE_PROJECT',
  data: { projectId: 1, progress: 75 }
}));
```

## 小程序端特殊接口

### 微信登录
```http
POST /auth/wechat-login
```

**请求参数:**
```json
{
  "code": "微信授权码",
  "userInfo": {
    "nickName": "用户昵称",
    "avatarUrl": "头像URL"
  }
}
```

### 获取用户信息
```http
GET /auth/wechat-userinfo
```

**请求头:**
```
Authorization: Bearer <token>
``` 