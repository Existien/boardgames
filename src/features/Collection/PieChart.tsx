import React, { useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend, Title);

interface Props {
  data: { [label: string]: Number };
  title: string;
  legendPosition: "top" | "left" | "right" | "bottom" | "center";
  colorMap: { [key: string]: string };
  dataLimit: number;
}

export const PieChart: React.FC<Props> = (props: Props) => {
  const [legendIdx, setLegendIdx] = useState(-1);
  const [tooltip, setTooltip] = useState<string | undefined>(undefined);

  let colors: Array<string> = [];
  let data: { [key: string]: Number } = {};
  for (const [key, val] of Object.entries(props.data)
    .sort((b, a) => Number(b[1]) - Number(a[1]))
    .slice(0, props.dataLimit)) {
    data[key] = val;
  }
  for (const key of Object.keys(data)) {
    colors.push(props.colorMap[key]);
  }
  return (
    <React.Fragment>
      <Pie
        width="100%"
        height="100%"
        options={{
          elements: {
            arc: {
              offset: (ctx) => {
                if (ctx.dataIndex === legendIdx) {
                  return 30;
                }
                return 0;
              },
            },
          },
          datasets: {
            pie: {
              hoverOffset: 5,
            },
          },
          maintainAspectRatio: true,
          layout: {
            padding: 0,
          },
          plugins: {
            tooltip: {},
            title: {
              text: props.title,
              display: true,
            },
            legend: {
              position: props.legendPosition,
              onHover: (e, legendItem, legend) => {
                const index = (legendItem as unknown as { index: number })
                  .index;
                setLegendIdx(index);
                setTooltip(
                  legend.chart.data.datasets[0].data[index].toString()
                );
              },
              onLeave: () => {
                setLegendIdx(-1);
                setTooltip(undefined);
              },
            },
          },
        }}
        title={tooltip}
        data={{
          labels: Object.keys(data),
          datasets: [
            {
              data: Object.values(data),
              backgroundColor: colors,
            },
          ],
        }}
      />
    </React.Fragment>
  );
};
