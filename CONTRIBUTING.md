# 🤝 Contributing to AI Design

Welcome to AI Design! We appreciate your interest in contributing to this revolutionary project that democratizes architectural design through AI.

## 🚀 Quick Start

### Prerequisites
- Node.js v16+
- MySQL v8+
- Git
- Basic knowledge of React + TypeScript

### Development Setup

```bash
# 1. Fork and clone the repository
git clone https://github.com/YOUR-USERNAME/AI-Design.git
cd AI-Design

# 2. Install dependencies
cd backend && npm install
cd ../frontend && npm install

# 3. Configure environment
cd backend
cp .env.example .env
# Edit .env with your configurations

# 4. Start development servers
npm run dev:backend    # Terminal 1: :5000
npm run dev:frontend   # Terminal 2: :3000
```

## 📋 Development Guidelines

### Code Standards
- **TypeScript**: Strict typing required
- **ESLint**: Follow configured rules
- **Prettier**: Auto-format before commit
- **Components**: Use functional components with hooks

### Naming Conventions
- **Files**: camelCase (userController.ts)
- **Components**: PascalCase (LoginForm.tsx)
- **Variables**: camelCase (userName)
- **Constants**: UPPER_SNAKE_CASE (JWT_SECRET)

### Commit Message Format
```
type(scope): description

feat(auth): add password reset functionality
fix(ui): resolve responsive design issue
docs(readme): update installation guide
style(components): improve button styling
refactor(api): optimize database queries
test(auth): add login validation tests
```

## 🔄 Contribution Process

### 1. Create Feature Branch
```bash
git checkout -b feature/new-functionality
git checkout -b fix/bug-description
git checkout -b docs/documentation-update
```

### 2. Make Changes
- Write clean, documented code
- Add tests for new functionality
- Update documentation if needed
- Follow existing patterns

### 3. Test Your Changes
```bash
# Backend tests
cd backend && npm test

# Frontend tests  
cd frontend && npm test

# Linting
npm run lint
```

### 4. Submit Pull Request
- **Title**: Clear, descriptive title
- **Description**: Explain what and why
- **Screenshots**: If UI changes
- **Testing**: How you tested changes

## 🎯 Areas Where You Can Help

### 💻 For Developers
- **Frontend**: React, Three.js, Canvas API
- **Backend**: Node.js, Express, MySQL
- **AI/ML**: Python, TensorFlow, NLP
- **CAD Integration**: Geometry libraries

### 🎨 For Designers  
- **UX/UI**: User experience improvements
- **3D Modeling**: Three.js optimizations
- **Visual Design**: Component styling

### 📚 For Architects
- **Domain Expertise**: Architectural standards
- **Use Cases**: Real-world scenarios
- **Validation**: Technical accuracy

### 📝 For Technical Writers
- **Documentation**: API docs, tutorials
- **Guides**: User and developer guides
- **Examples**: Code samples and demos

## 🐛 Bug Reports

When reporting bugs, include:
- **Clear description** of the issue
- **Steps to reproduce** the problem
- **Expected vs actual** behavior
- **Environment details** (OS, Node version, etc.)
- **Screenshots** if applicable

## 💡 Feature Requests

For new features, provide:
- **Problem statement**: What issue does it solve?
- **Proposed solution**: How should it work?
- **Use cases**: When would this be used?
- **Priority level**: How important is this?

## 📞 Getting Help

- **GitHub Issues**: Technical questions
- **Discussions**: General questions and ideas
- **Email**: ai.design.project@gmail.com

## 🏆 Recognition

Contributors will be:
- Listed in project contributors
- Credited in release notes
- Invited to project discussions
- Recognized in community highlights

## 📄 Code of Conduct

Be respectful, inclusive, and professional. We want AI Design to be welcoming for everyone contributing to the future of architectural design.

---

**Thank you for helping democratize architectural design! 🎨🚀**