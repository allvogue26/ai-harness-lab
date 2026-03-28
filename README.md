# AI Harness Engineering Lab

> 实践 Anthropic 文章《Harness design for long-running application development》中的多代理架构

## 核心概念

本项目实现一个 **三代理架构 (Planner + Generator + Evaluator)**，用于长程 AI 编程任务：

```
User Prompt → [Planner] → Product Spec → [Generator] → Code → [Evaluator] → Feedback
                                                      ↓
                                               (迭代循环)
```

### 三个代理的角色

| 代理 | 职责 | 类比 |
|------|------|------|
| **Planner** | 将简单提示扩展为完整产品规格 | 产品经理 |
| **Generator** | 按 sprint 实现功能 | 程序员 |
| **Evaluator** | 独立评判产出质量，提供具体反馈 | 测试/QA |

## 项目结构

```
ai-harness-lab/
├── README.md                 # 本文件
├── prompts/                  # 各代理的系统提示词
│   ├── planner-prompt.md
│   ├── generator-prompt.md
│   └── evaluator-prompt.md
├── experiments/              # 实验案例
│   ├── experiment-1-simple-app/
│   ├── experiment-2-game-maker/
│   └── experiment-3-daw/
├── src/                      # 实现代码
│   ├── agents/
│   │   ├── planner.py
│   │   ├── generator.py
│   │   └── evaluator.py
│   └── orchestrator.py       # 主调度器
├── docs/                     # 文档
│   ├── anthropic-article-notes.md
│   └── lessons-learned.md
└── results/                  # 实验结果
    └── README.md
```

## 快速开始

### 1. 阅读核心文档

- [Anthropic 原文笔记](docs/anthropic-article-notes.md)
- [Planner Prompt](prompts/planner-prompt.md)
- [Generator Prompt](prompts/generator-prompt.md)
- [Evaluator Prompt](prompts/evaluator-prompt.md)

### 2. 运行第一个实验

```bash
# 使用简单提示测试三代理系统
python src/orchestrator.py \
  --prompt "创建一个待办事项管理应用" \
  --output-dir experiments/exp-001-todo-app
```

### 3. 查看结果

```bash
cd experiments/exp-001-todo-app
cat product-spec.md      # Planner 产出的规格
cat generated-code/      # Generator 产出的代码
cat evaluation-report.md # Evaluator 的评估报告
```

## 关键设计决策

### 1. 评估标准 (Grading Criteria)

我们将主观质量转化为可评分的标准：

| 标准 | 权重 | 描述 |
|------|------|------|
| **Design Quality** | 高 | 整体设计是否协调一致？ |
| **Originality** | 高 | 是否有自定义设计，还是模板堆砌？ |
| **Craft** | 中 | 技术执行是否扎实（间距、对比度等）？ |
| **Functionality** | 中 | 功能是否完整可用？ |

### 2. 上下文管理

- **Context Reset**: 长任务中定期重置上下文，避免模型"焦虑"
- **Structured Handoff**: 通过文件在代理间传递状态
- **Sprint Contract**: 每次 sprint 前协商"完成标准"

### 3. 分离生成与评估

为什么不用单代理自评估？
- 模型对自己作品过于宽容（"self-evaluation leniency"）
- 独立 evaluator 可以调得更严格
- 生成器有具体反馈可迭代

## 实验记录

| 实验 | 描述 | 成本 | 结果 |
|------|------|------|------|
| Exp-1 | 简单待办应用 | $X | TBD |
| Exp-2 | 复古游戏制作器 | $200/6h | TBD |
| Exp-3 | DAW 音乐工作站 | $124/4h | TBD |

## 学习笔记

见 [docs/lessons-learned.md](docs/lessons-learned.md)

## 参考

- [Anthropic 原文](https://www.anthropic.com/engineering/harness-design-long-running-apps)
- [Effective Harnesses for Long-Running Agents](https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents)
- [Building Effective Agents](https://www.anthropic.com/research/building-effective-agents)

## License

MIT - 用于学习和实验目的
