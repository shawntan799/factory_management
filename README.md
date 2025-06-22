# 生产施工管理系统

## 项目简介

生产施工管理系统是一个专为建筑装饰行业设计的双端管理系统，包含网页端（PC后台管理）和微信小程序端（移动办公）。

## 技术架构

### 前端技术栈
- **网页端**: Vue3 + TypeScript + Element Plus + Vite
- **小程序端**: UniApp + Vue3 + TypeScript

### 后端技术栈
- **框架**: Spring Boot 3.x
- **数据库**: MySQL 8.0
- **ORM**: MyBatis Plus
- **认证**: JWT + Spring Security
- **实时通信**: WebSocket
- **缓存**: Redis

## 系统功能

### 基础信息管理
- 客户管理
- 供应商管理
- 人员管理（老板/财务/经理/员工）

### 工程施工管理
- 项目管理
- 生产管理
- 进度管理
- 成本管理

### 来料加工管理
- 物料清单
- 出货管理
- 数据查询

### 数据分析系统
- 成本核算
- 结算管理
- 财务报表
- 产值统计

## 项目结构

```
production-management-system/
├── backend/                 # 后端项目
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/
│   │   │   └── resources/
│   │   └── test/
│   ├── pom.xml
│   └── README.md
├── frontend/                # 网页端项目
│   ├── src/
│   ├── package.json
│   └── README.md
├── miniprogram/             # 小程序端项目
│   ├── src/
│   ├── package.json
│   └── README.md
├── docs/                    # 文档
│   ├── 技术选型报告.md
│   ├── API文档.md
│   └── 数据库设计.md
└── README.md
```

## 快速开始

### 环境要求
- Node.js 18+
- Java 17+
- MySQL 8.0+
- Redis 6.0+

### 安装步骤

1. 克隆项目
```bash
git clone <repository-url>
cd production-management-system
```

2. 启动后端服务
```bash
cd backend
mvn spring-boot:run
```

3. 启动前端服务
```bash
cd frontend
npm install
npm run dev
```

4. 启动小程序开发
```bash
cd miniprogram
npm install
# 使用HBuilderX打开项目
```

## 开发规范

### 代码规范
- 使用ESLint + Prettier进行代码格式化
- 遵循TypeScript严格模式
- 使用Git Flow工作流

### 提交规范
```
feat: 新功能
fix: 修复bug
docs: 文档更新
style: 代码格式调整
refactor: 代码重构
test: 测试相关
chore: 构建过程或辅助工具的变动
```

## 部署说明

### 生产环境部署
1. 构建后端JAR包
2. 构建前端静态文件
3. 配置Nginx反向代理
4. 部署到服务器

### 小程序发布
1. 构建小程序代码
2. 上传到微信开发者工具
3. 提交审核发布

## 贡献指南

1. Fork 项目
2. 创建功能分支
3. 提交代码
4. 创建Pull Request

## 许可证

MIT License

## 联系方式

- 项目维护者: [您的姓名]
- 邮箱: [您的邮箱]
- 微信: [您的微信]
