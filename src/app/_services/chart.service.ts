import { Injectable } from '@angular/core';
import { Chart } from 'chart.js';

@Injectable({
  providedIn: 'root',
})
export class ChartService {
  constructor() {}

  styleCharts() {
    Chart.defaults.global.responsive = true;
    Chart.defaults.global.maintainAspectRatio = false;
    // Chart.defaults.global.defaultColor = '#95AAC9';
    Chart.defaults.global.defaultFontColor = '#95AAC9';
    Chart.defaults.global.defaultFontFamily = 'Cerebri Sans';
    Chart.defaults.global.defaultFontSize = 13;
    Chart.defaults.global.layout.padding = 0;
    Chart.defaults.global.legend.display = false;
    Chart.defaults.global.legend.position = 'bottom';
    Chart.defaults.global.legend.labels.usePointStyle = true;
    Chart.defaults.global.legend.labels.padding = 16;
    Chart.defaults.global.elements.point.radius = 0;
    Chart.defaults.global.elements.point.backgroundColor = '#2C7BE5';
    Chart.defaults.global.elements.line.tension = 0.4;
    Chart.defaults.global.elements.line.borderWidth = 3;
    Chart.defaults.global.elements.line.borderColor = '#2C7BE5';
    Chart.defaults.global.elements.line.backgroundColor = 'transparent';
    Chart.defaults.global.elements.line.borderCapStyle = 'rounded';
    Chart.defaults.global.elements.rectangle.backgroundColor = '#2C7BE5';
    // Chart.defaults.global.elements.rectangle.maxBarThickness = 10;
    Chart.defaults.global.elements.arc.backgroundColor = '#2C7BE5';
    Chart.defaults.global.elements.arc.borderColor = '#FFFFFF';
    Chart.defaults.global.elements.arc.borderWidth = 4;
    // Chart.defaults.global.elements.arc.hoverBorderColor = '#FFFFFF';
    Chart.defaults.global.tooltips.enabled = false;
    Chart.defaults.global.tooltips.mode = 'index';
    Chart.defaults.global.tooltips.intersect = false;
    Chart.defaults.global.tooltips.custom = function (tooltipModel) {
      let tooltipEl = document.getElementById('chart-tooltip');
      const chartType = this._chart.config.type;

      if (!tooltipEl) {
        tooltipEl = document.createElement('div');
        tooltipEl.id = 'chart-tooltip';
        tooltipEl.setAttribute('role', 'tooltip');
        tooltipEl.classList.add('popover');
        tooltipEl.classList.add('bs-popover-top');
        document.body.appendChild(tooltipEl);
      }

      if (tooltipModel.opacity === 1) {
        if (tooltipModel.body) {
          const title = tooltipModel.title || [];
          const body = tooltipModel.body.map((e) => e.lines);
          let html = `<div class="arrow"></div>`;

          title.forEach((e) => {
            html += `<h3 class="popover-header text-center">${e}</h3>`;
          });
          body.forEach((e, i) => {
            const color = tooltipModel.labelColors[i];
            const legend = `<span class="popover-body-indicator" style="background-color:${
              chartType === 'line' && color['borderColor'] !== 'rgba(0,0,0,0.1)'
                ? color['borderColor']
                : color['backgroundColor']
              // color['backgroundColor']
            }"></span>`;
            const justifyContent =
              e.length < 1 ? 'justify-content-left' : 'justify-content-center';

            html += `<div class="popover-body d-flex align-items-center ${justifyContent}">${legend}${e}</div>`;
          });
          tooltipEl.innerHTML = html;
        }

        const position = this._chart.canvas.getBoundingClientRect();
        const windowTop =
          window.pageYOffset ||
          document.documentElement.scrollTop ||
          document.body.scrollTop ||
          0;
        const windowLeft =
          window.pageXOffset ||
          document.documentElement.scrollLeft ||
          document.body.scrollLeft ||
          0;
        tooltipEl.style.top =
          position.top +
          windowTop +
          tooltipModel.caretY -
          tooltipEl.offsetHeight -
          16 +
          'px';
        tooltipEl.style.left =
          position.left +
          windowLeft +
          tooltipModel.caretX -
          tooltipEl.offsetWidth / 2 +
          'px';
        tooltipEl.style.visibility = 'visible';
      } else {
        tooltipEl.style.visibility = 'hidden';
      }
    };
    Chart.defaults.global.tooltips.callbacks.label = function (e, t) {
      let a = '';
      const o = e.yLabel;
      const l = t.datasets[e.datasetIndex];
      const r = l.label;
      const n = l.yAxisID ? l.yAxisID : 0;
      const s = this._chart.options.scales.yAxes;
      let c = s[0];
      if (n) {
        c = s.filter(function (f) {
          return f.id === n;
        })[0];
      }
      const i = c.ticks.callback;
      return (
        1 <
          t.datasets.filter(function (g) {
            return !g.hidden;
          }).length &&
          (a = '<span class="popover-body-label mr-auto">' + r + '</span>'),
        (a += '<span class="popover-body-value">' + i(o) + '</span>')
      );
    };

    Chart.defaults['doughnut'].cutoutPercentage = 83;
    Chart.defaults['doughnut'].tooltips.callbacks.title = (items, data) => {
      return data.labels[items[0].index];
    };
    Chart.defaults['doughnut'].tooltips.callbacks.label = function (
      items,
      data
    ) {
      const a = data.datasets[0].data[items.index];
      const o = this._chart.options.tooltips.callbacks;
      const l = o.afterLabel() ? o.afterLabel() : '';
      return `<span class="popover-body-value"> ${
        o.beforeLabel() ? o.beforeLabel() : ''
      }${a} ${l}</span>`;
    };
    Chart.defaults['doughnut'].legendCallback = (e) => {
      let l;
      e.data.forEach((f, t) => {
        l = `<span class="chart-legend-item"><i class="chart-legend-indicator" style="background-color: ${e.data.datasets[0].backgroundColor[t]}"></i>${f}</span>`;
      });
      return l;
    };

    Chart.scaleService.updateScaleDefaults('linear', {
      gridLines: {
        borderDash: [2],
        borderDashOffset: 2,
        color: '#E3EBF6',
        drawBorder: false,
        drawTicks: false,
        zeroLineColor: '#E3EBF6',
        zeroLineBorderDash: [2],
        zeroLineBorderDashOffset: 2,
      },
      ticks: {
        beginAtZero: true,
        padding: 10,
        maxTicksLimit: 5,
      },
    });

    Chart.scaleService.updateScaleDefaults('category', {
      gridLines: {
        drawBorder: false,
        drawOnChartArea: false,
        drawTicks: false,
      },
      ticks: { padding: 20 },
    });

    /*=====================================*/
    // Rounded bars
    Chart['elements'].Rectangle.prototype.draw = function () {
      const ctx = this._chart.ctx;
      const vm = this._view;
      let left;
      let right;
      let top;
      let bottom;
      let signX;
      let signY;
      let borderSkipped;
      let radius;
      let borderWidth = vm.borderWidth;
      // Set Radius Here
      // If radius is large enough to cause drawing errors a max radius is imposed
      const cornerRadius = 6;

      if (!vm.horizontal) {
        // bar
        left = vm.x - vm.width / 2;
        right = vm.x + vm.width / 2;
        top = vm.y;
        bottom = vm.base;
        signX = 1;
        signY = bottom > top ? 1 : -1;
        borderSkipped = vm.borderSkipped || 'bottom';
      } else {
        // horizontal bar
        left = vm.base;
        right = vm.x;
        top = vm.y - vm.height / 2;
        bottom = vm.y + vm.height / 2;
        signX = right > left ? 1 : -1;
        signY = 1;
        borderSkipped = vm.borderSkipped || 'left';
      }

      // Canvas doesn't allow us to stroke inside the width so we can
      // adjust the sizes to fit if we're setting a stroke on the line
      if (borderWidth) {
        // borderWidth shold be less than bar width and bar height.
        const barSize = Math.min(
          Math.abs(left - right),
          Math.abs(top - bottom)
        );
        borderWidth = borderWidth > barSize ? barSize : borderWidth;
        const halfStroke = borderWidth / 2;
        // Adjust borderWidth when bar top position is near vm.base(zero).
        const borderLeft =
          left + (borderSkipped !== 'left' ? halfStroke * signX : 0);
        const borderRight =
          right + (borderSkipped !== 'right' ? -halfStroke * signX : 0);
        const borderTop =
          top + (borderSkipped !== 'top' ? halfStroke * signY : 0);
        const borderBottom =
          bottom + (borderSkipped !== 'bottom' ? -halfStroke * signY : 0);
        // not become a vertical line?
        if (borderLeft !== borderRight) {
          top = borderTop;
          bottom = borderBottom;
        }
        // not become a horizontal line?
        if (borderTop !== borderBottom) {
          left = borderLeft;
          right = borderRight;
        }
      }

      ctx.beginPath();
      ctx.fillStyle = vm.backgroundColor;
      ctx.strokeStyle = vm.borderColor;
      ctx.lineWidth = borderWidth;

      // Corner points, from bottom-left to bottom-right clockwise
      // | 1 2 |
      // | 0 3 |
      let corners = [
        [left, bottom],
        [left, top],
        [right, top],
        [right, bottom],
      ];
      if (
        this._chart.config.data.datasets[this._datasetIndex].data[this._index] <
        0
      ) {
        corners = [
          [left, top],
          [left, bottom],
          [right, top],
          [right, bottom],
        ];
      }

      // Find first (starting) corner with fallback to 'bottom'
      const borders = ['bottom', 'left', 'top', 'right'];
      let startCorner = borders.indexOf(borderSkipped, 0);
      if (startCorner === -1) {
        startCorner = 0;
      }

      function cornerAt(index) {
        return corners[(startCorner + index) % 4];
      }

      // Draw rectangle from 'startCorner'
      let corner = cornerAt(0);
      ctx.moveTo(corner[0], corner[1]);

      for (let i = 1; i < 4; i++) {
        corner = cornerAt(i);
        let nextCornerId = i + 1;
        if (nextCornerId === 4) {
          nextCornerId = 0;
        }

        // const nextCorner = cornerAt(nextCornerId);

        const width = corners[2][0] - corners[1][0];
        const height = corners[0][1] - corners[1][1];
        const x = corners[1][0];
        const y = corners[1][1];

        radius = cornerRadius;

        // Fix radius being too large
        if (radius > height / 2) {
          radius = height / 2;
        }
        if (radius > width / 2) {
          radius = width / 2;
        }

        ctx.moveTo(x + radius, y);
        ctx.lineTo(x + width - radius, y);
        ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
        ctx.lineTo(x + width, y + height - radius);
        ctx.quadraticCurveTo(
          x + width,
          y + height,
          x + width - radius,
          y + height
        );
        ctx.lineTo(x + radius, y + height);
        ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
        ctx.lineTo(x, y + radius);
        ctx.quadraticCurveTo(x, y, x + radius, y);
      }

      ctx.fill();

      if (borderWidth) {
        ctx.stroke();
      }
    };
  }
}
