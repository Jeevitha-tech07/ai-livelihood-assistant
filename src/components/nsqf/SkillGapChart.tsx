'use client';

import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from 'recharts';
import { CompetencyEvaluation } from '@/lib/nsqf/skillGapEngine';

interface SkillGapChartProps {
  evaluations: CompetencyEvaluation[];
}

export function SkillGapChart({ evaluations }: SkillGapChartProps) {
  const chartData = evaluations.map((item) => ({
    name: item.competencyName.length > 25 ? item.competencyName.substring(0, 22) + '...' : item.competencyName,
    fullName: item.competencyName,
    score: item.scorePercentage,
    status: item.status,
  }));

  const getColor = (status: string) => {
    switch (status) {
      case 'met':
        return '#059669'; // Emerald Green
      case 'partial':
        return '#d97706'; // Amber Gold
      case 'missing':
        return '#dc2626'; // Red Rose
      default:
        return '#94a3b8';
    }
  };

  return (
    <div className="w-full h-64 sm:h-72 my-4">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          layout="vertical"
          data={chartData}
          margin={{ top: 10, right: 30, left: 20, bottom: 10 }}
        >
          <XAxis type="number" domain={[0, 100]} unit="%" tick={{ fontSize: 12 }} />
          <YAxis
            type="category"
            dataKey="name"
            width={140}
            tick={{ fontSize: 11 }}
            axisLine={false}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#0f172a',
              color: '#fff',
              borderRadius: '12px',
              fontSize: '12px',
              border: 'none',
            }}
          />
          <Bar dataKey="score" radius={[0, 8, 8, 0]} barSize={20}>
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={getColor(entry.status)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
