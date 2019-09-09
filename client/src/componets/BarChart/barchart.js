// @flow
import React, { Component } from "react";
import { Input, Button, Header, Modal, Icon } from "semantic-ui-react";
import * as d3 from "d3";
class BarChart extends Component {
    componentDidMount() {
      this.drawChart();
    }
      
    drawChart() {
      const data = [12, 5, 6, 6, 9, 10];
        
    }
          
    render(){
      return <div id='myId'></div>
    }
  }
      
  export default BarChart;