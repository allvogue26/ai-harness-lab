# Anthropic 文章核心笔记

> 原文：https://www.anthropic.com/engineering/harness-design-long-running-apps

## 核心问题

为什么长程 AI 任务容易失败？

### 1. 上下文窗口问题
- 模型在上下文填满后失去连贯性
- **Context Anxiety**：模型提前收尾，担心达到上下文限制
- **解决方案**：Context Reset（上下文重置）+ Structured Handoff

### 2. 自评估偏差
- 模型对自己的作品过于宽容
- 主观任务（如设计）没有二进制测试
- **解决方案**：分离 Generator 和 Evaluator

## 关键架构

### 前端设计实验

**四评分标准**：
1. Design Quality（整体性）- 高权重
2. Originality（原创性）- 高权重
3. Craft（技术执行）- 中权重
4. Functionality（功能性）- 中权重

**迭代循环**：
- Generator 生成 → Evaluator 评分（1-100）+ 详细反馈 → Generator 迭代
- 5-15 轮迭代
- 每轮 4 小时（因为 Evaluator 要实际导航页面）

### 全栈开发架构

**三代理系统**：

```
Planner → Generator ↔ Evaluator
```

**Planner**：
- 输入：1-4 句用户提示
- 输出：16 功能的完整规格
- 职责：产品上下文、高阶技术设计

**Generator**：
- 一次一个 sprint 实现
- 技术栈：React + Vite + FastAPI + SQLite
- 每 sprint 结束时自评

**Evaluator**：
- 使用 Playwright MCP 实际测试
- 评分标准：Feature Completeness / Design / Code Quality / UX
- 硬阈值：低于阈值 = Sprint 失败

**Sprint Contract**：
- Generator 和 Evaluator 在编码前协商
- 定义"完成"的标准
- 可测试的行为列表

## 关键数据

| 实验 | 成本 | 时长 | 结果对比 |
|------|------|------|---------|
| Solo Agent | $9 | 20min | 核心功能损坏 |
| Full Harness | $200 | 6hr | 完整可用应用 |
| DAW Harness | $124 | 4hr | 功能完整但有缺陷 |

## 关键发现

### 1. Evaluator 不是固定开销
- 当任务在模型能力边界内时 → Evaluator 是 overhead
- 当任务超出边界时 → Evaluator 提供真实价值

### 2. 模型进化简化 Harness
- Opus 4.6 比 4.5 需要更少的脚手架
- 可以移除 Sprint 结构，单会话运行
- 但 Evaluator 仍能在边界处捕获问题

### 3. 评分标准驱动行为
- 措辞直接影响输出方向
- "museum quality" → 特定的视觉趋同
- 高权重标准 → 模型更愿意冒险

## 实施建议

### 从简单开始
1. 先做单代理 baseline
2. 再引入 Evaluator
3. 最后添加 Planner

### 调优 Evaluator
- 初始版本太宽容
- 通过 few-shot 校准
- 阅读日志，发现判断分歧点，更新 prompt

### 模型选择
- 复杂任务：Claude Opus
- 简单任务：Sonnet 可能足够
- 新模型发布时重新评估 harness 组件

## 启发

1. **分离关注点**：生成 ≠ 评判
2. **可执行的标准**：把主观判断变成可评分标准
3. **实际测试**：不要只看代码，要运行验证
4. **迭代反馈**：具体、可执行的反馈比泛泛而谈有用
5. **假设检验**：定期移除 harness 组件，验证是否仍必要
