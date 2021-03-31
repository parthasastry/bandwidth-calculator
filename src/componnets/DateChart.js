import React, { Component } from "react";
import Chart from "react-apexcharts";

export class DateChart extends Component {
  state = {
    options: {},
    series: [
      {
        data: [],
      },
    ],
  };

  componentDidMount() {
    console.log(this.props.sizeInMB)
    const max_yaxis = Math.max(...this.props.sizeInMB)

    var options = {
      chart: {
        height: 350,
        type: this.props.chartType,
        dropShadow: {
          enabled: true,
          color: "#000",
          top: 18,
          left: 7,
          blur: 10,
          opacity: 0.2,
        },
        toolbar: {
          show: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
      },
      title: {
        text: this.props.title,
        align: "center",
      },
      xaxis: {
        categories: this.props.dates,
        title: {
          text: this.props.xaxis,
        },
      },
      yaxis: {
        title: {
          text: this.props.yaxis,
        },
        min: 0,
        max: max_yaxis,
        forceNiceScale: true,
      },
      legend: {
        position: "top",
        horizontalAlign: "right",
        floating: true,
        offsetY: -25,
        offsetX: -5,
      },
      dataLabels: {
          enabled: false,
          formatter: function (val) {
            return val.toLocaleString() + " MB";
          },
      }
    };
    
    var series = [
      {
        name: "Size",
        data: this.props.sizeInMB,
      },
    ];

    this.setState({
      options: options,
      series: series,
    });
  }

  render() {
    return (
      <div>
        <Chart
          options={this.state.options}
          series={this.state.series}
          type={this.props.chartType}
        />
      </div>
    );
  }
}

export default DateChart;
