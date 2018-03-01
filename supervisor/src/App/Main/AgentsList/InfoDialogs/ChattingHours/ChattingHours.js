import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite';
import { Chart } from 'react-google-charts';

export default class ChattingHours extends Component {

  getLongestTime = () => {
    let longest = 0;
    this.props.data.slice(1).forEach(data => {
      if(data[1] > longest) longest = data[1];
    });
    return longest;
  };

  getShortestTime = () => {
    let shortest;
    this.props.data.slice(1).forEach(data => {
      if(data[1] < shortest || !shortest) shortest = data[1];
    });
    return shortest;
  };

  getAverageTime = () => {
    let average = 0;
    let itemsTakeToCount = 0;
    this.props.data.slice(1).forEach(data => {
      if(data[1] && data[1] !== 0) {
        itemsTakeToCount++;
        average += data[1];
      }
    });
    if(itemsTakeToCount === 0) return '0';
    else return Math.round(average / (itemsTakeToCount) * 100) / 100;
  };

  render(){
    return(
      <div className={css(styles.container)}>
        <p className={css(styles.title)}><span className={css(styles.chattingTime)}>Chatting Time</span> this week</p>
        {this.props.data && <Chart
          chartType="AreaChart"
          data={this.props.data}
          options={{
            title: 'Chatting time: hours / day',
            legend: { position: 'none' },
            backgroundColor: { fill: '#F5F5F5', strokeWidth: 40, stroke: 'white' },
            colors: ['#4CAF50'],
            chartArea: { width: '75%', left: '15%' },
            titleTextStyle: { color: '#555', fontSize: '13' },
            vAxis: { minValue: 0 },
            animation: { duration: 500, startup: true },
          }}
          graph_id="AreaChart"
          width="84vw"
          height="40vh"
          legend_toggle
        />}
        <div className={css(styles.textContainer)}>
          <span className={css(styles.name)}>Average Time:</span>
          <span className={css(styles.value)}><strong className={css(styles.average)}>{this.getAverageTime()}</strong></span>
        </div>
        <div className={css(styles.textContainer)}>
          <span className={css(styles.name)}>Longest Time:</span>
          <span className={css(styles.value)}><strong className={css(styles.longest)}>{this.getLongestTime()}</strong></span>
        </div>
        <div className={css(styles.textContainer)}>
          <span className={css(styles.name)}>Shortest Time:</span>
          <span className={css(styles.value)}><strong className={css(styles.shortest)}>{this.getShortestTime()}</strong></span>
        </div>
      </div>
    )
  }
}

ChattingHours.propTypes = {
  data: PropTypes.array,
};

ChattingHours.defaultTypes = {
  data: null,
};

const styles = StyleSheet.create({
  container: {
    width:'100%',
    marginLeft: '-2vw'
  },
  textContainer: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: '#F5F5F5',
    paddingTop: '1vh',
    paddingBottom: '1vh',
    margin: '2vw',
    marginLeft: '4vw',
  },
  title: {
    backgroundColor: '#F5F5F5',
    padding: '1vh 3vw 1vh',
    margin: '2vw',
    marginLeft: '4vw',
    color: '#555',
    fontWeight: '600',
  },
  name: {
    color: '#777',
    flex: 1,
    textAlign: 'center',
    fontWeight: '600',
    paddingLeft: '8vw',
  },
  value: {
    color: '#777',
    flex: 1,
    textAlign: 'center',
    fontWeight: '600',
    paddingRight: '6vw',
  },
  chattingTime: {
    color:'#388E3C'
  },
  average: {
    color: '#2196F3',
  },
  longest: {
    color: '#4CAF50',
  },
  shortest: {
    color: '#F57C00',
  }
});