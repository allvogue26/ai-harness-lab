"""
AI Harness Orchestrator
> 主调度器 - 协调 Planner + Generator + Evaluator

Usage:
    python orchestrator.py --prompt "创建一个待办事项应用" --output-dir ./exp-001
"""

import argparse
import os
import json
from datetime import datetime
from typing import Optional
from dataclasses import dataclass, asdict
from pathlib import Path


@dataclass
class HarnessConfig:
    """Harness 配置"""
    max_iterations: int = 5
    feature_threshold: float = 80.0
    design_threshold: float = 70.0
    model_planner: str = "claude-opus-4-6"
    model_generator: str = "claude-opus-4-6"
    model_evaluator: str = "claude-opus-4-6"


@dataclass
class SprintResult:
    """单次 Sprint 结果"""
    sprint_number: int
    status: str  # "PASS" | "NEEDS_REVISION"
    scores: dict
    bugs_found: list
    action_items: list


class PlannerAgent:
    """规划师代理 - 生成产品规格"""
    
    def __init__(self, prompt_file: str):
        with open(prompt_file) as f:
            self.system_prompt = f.read()
    
    def generate_spec(self, user_prompt: str, output_dir: str) -> str:
        """
        生成 product-spec.md
        
        Args:
            user_prompt: 用户的简单描述
            output_dir: 输出目录
            
        Returns:
            生成的规格文档路径
        """
        print(f"[Planner] 正在扩展提示: {user_prompt[:50]}...")
        
        # TODO: 调用 Claude API
        # spec = claude.messages.create(
        #     model=self.config.model_planner,
        #     system=self.system_prompt,
        #     messages=[{"role": "user", "content": user_prompt}]
        # )
        
        spec_path = os.path.join(output_dir, "product-spec.md")
        
        # 占位：创建模板规格
        spec_content = f"""# Product Spec

## Overview
User Prompt: {user_prompt}
Generated at: {datetime.now().isoformat()}

## Features
(TODO: Planner 生成)

## Technical Architecture
- Frontend: React + Vite + TypeScript
- Backend: FastAPI
- Database: SQLite

## Sprint Planning
(TODO: Planner 生成)
"""
        
        os.makedirs(output_dir, exist_ok=True)
        with open(spec_path, 'w') as f:
            f.write(spec_content)
        
        print(f"[Planner] ✓ 规格已生成: {spec_path}")
        return spec_path


class GeneratorAgent:
    """生成器代理 - 按 sprint 实现功能"""
    
    def __init__(self, prompt_file: str):
        with open(prompt_file) as f:
            self.system_prompt = f.read()
    
    def negotiate_contract(self, sprint_number: int, spec_path: str, output_dir: str) -> str:
        """
        与 Evaluator 协商 Sprint Contract
        """
        print(f"[Generator] Sprint {sprint_number}: 协商 contract...")
        
        contract_path = os.path.join(output_dir, f"sprint-{sprint_number}-contract.md")
        
        # 占位
        contract = f"""# Sprint {sprint_number} Contract

## Goal
(TODO: 协商确定)

## Testable Behaviors
- [ ] 行为1
- [ ] 行为2
"""
        with open(contract_path, 'w') as f:
            f.write(contract)
        
        print(f"[Generator] ✓ Contract 已创建: {contract_path}")
        return contract_path
    
    def implement(self, sprint_number: int, contract_path: str, 
                  feedback_path: Optional[str], output_dir: str) -> str:
        """
        实现当前 sprint
        """
        print(f"[Generator] Sprint {sprint_number}: 开始实现...")
        
        code_dir = os.path.join(output_dir, f"sprint-{sprint_number}-code")
        os.makedirs(code_dir, exist_ok=True)
        
        # TODO: 调用 Claude API 生成代码
        
        print(f"[Generator] ✓ 代码已生成: {code_dir}")
        return code_dir


class EvaluatorAgent:
    """评估器代理 - 评判产出质量"""
    
    def __init__(self, prompt_file: str):
        with open(prompt_file) as f:
            self.system_prompt = f.read()
    
    def review_contract(self, contract_path: str) -> bool:
        """
        审核 Sprint Contract
        """
        print(f"[Evaluator] 审核 contract...")
        # TODO: 与 Generator 协商
        return True
    
    def evaluate(self, sprint_number: int, code_dir: str, 
                 contract_path: str, output_dir: str) -> SprintResult:
        """
        评估 sprint 产出
        """
        print(f"[Evaluator] Sprint {sprint_number}: 开始评估...")
        
        # TODO: 
        # 1. 启动应用
        # 2. 使用 Playwright 测试
        # 3. 按标准评分
        
        report_path = os.path.join(output_dir, f"sprint-{sprint_number}-eval.md")
        
        # 占位结果
        result = SprintResult(
            sprint_number=sprint_number,
            status="PASS",  # 或 "NEEDS_REVISION"
            scores={
                "feature_completeness": 85,
                "functionality": 80,
                "design_quality": 75,
                "code_quality": 78,
                "ux": 72
            },
            bugs_found=[],
            action_items=[]
        )
        
        # 保存报告
        report = f"""# Evaluation Report: Sprint {sprint_number}

## Result: {result.status}

## Scores
{json.dumps(result.scores, indent=2)}

## Bugs Found
(TODO)

## Action Items
(TODO)
"""
        with open(report_path, 'w') as f:
            f.write(report)
        
        print(f"[Evaluator] ✓ 评估完成: {result.status}")
        return result


class HarnessOrchestrator:
    """Harness 主协调器"""
    
    def __init__(self, config: HarnessConfig):
        self.config = config
        self.planner = PlannerAgent("prompts/planner-prompt.md")
        self.generator = GeneratorAgent("prompts/generator-prompt.md")
        self.evaluator = EvaluatorAgent("prompts/evaluator-prompt.md")
    
    def run(self, user_prompt: str, output_dir: str):
        """
        运行完整 Harness 流程
        """
        print(f"\n{'='*60}")
        print(f"AI Harness Lab - Experiment Start")
        print(f"Prompt: {user_prompt}")
        print(f"Output: {output_dir}")
        print(f"{'='*60}\n")
        
        os.makedirs(output_dir, exist_ok=True)
        
        # Phase 1: Planning
        print("\n📋 Phase 1: Planning")
        spec_path = self.planner.generate_spec(user_prompt, output_dir)
        
        # Phase 2-4: Sprint 循环
        sprint_number = 1
        max_sprints = 6
        
        while sprint_number <= max_sprints:
            print(f"\n{'='*60}")
            print(f"🔄 Sprint {sprint_number}/{max_sprints}")
            print(f"{'='*60}")
            
            # Step 1: 协商 Contract
            print("\n🤝 Step 1: Negotiate Contract")
            contract_path = self.generator.negotiate_contract(
                sprint_number, spec_path, output_dir
            )
            self.evaluator.review_contract(contract_path)
            
            # Step 2: 实现
            print("\n💻 Step 2: Implementation")
            feedback_path = None
            if sprint_number > 1:
                prev_eval = os.path.join(output_dir, f"sprint-{sprint_number-1}-eval.md")
                if os.path.exists(prev_eval):
                    feedback_path = prev_eval
            
            code_dir = self.generator.implement(
                sprint_number, contract_path, feedback_path, output_dir
            )
            
            # Step 3: 评估
            print("\n🔍 Step 3: Evaluation")
            result = self.evaluator.evaluate(
                sprint_number, code_dir, contract_path, output_dir
            )
            
            # 检查是否通过
            if result.status == "PASS":
                print(f"\n✅ Sprint {sprint_number} PASSED")
                sprint_number += 1
            else:
                print(f"\n❌ Sprint {sprint_number} NEEDS REVISION")
                # 重新实现，不增加 sprint_number
                # 或者设置最大重试次数
            
            # 检查是否所有功能已完成
            # TODO: 检查是否还有剩余功能
        
        print(f"\n{'='*60}")
        print(f"✨ Experiment Complete!")
        print(f"Results: {output_dir}")
        print(f"{'='*60}\n")


def main():
    parser = argparse.ArgumentParser(description="AI Harness Orchestrator")
    parser.add_argument("--prompt", required=True, help="User prompt for the app")
    parser.add_argument("--output-dir", default="./experiment", help="Output directory")
    parser.add_argument("--max-sprints", type=int, default=6, help="Maximum sprints")
    
    args = parser.parse_args()
    
    config = HarnessConfig(max_iterations=args.max_sprints)
    orchestrator = HarnessOrchestrator(config)
    orchestrator.run(args.prompt, args.output_dir)


if __name__ == "__main__":
    main()
