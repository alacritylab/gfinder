import * as React from 'react';
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Checkbox from '@material-ui/core/Checkbox'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import IFilter from '../../dto/IFilter';
import IHandlers from '../../dto/IHandlers';
import { Divider } from '@material-ui/core';
import Slider from '@material-ui/core/Slider';

interface IFilterProps {
  filtersState: { [key: string]: boolean };
  filter: IFilter;
}

interface IFilterState {
  sliderValue: [number, number];
}

export default class Filter extends React.Component<IFilterProps & IHandlers, IFilterState> {
  constructor(props) {
    super(props);
    const { filter } = this.props;
    if (filter.type === 'slider') {
      this.state = {
        // @ts-ignore
        sliderValue: [filter.options.min, filter.options.max]
      }
    }
  }

  handleChange(newValue: [number, number]) {
    this.setState({ sliderValue: newValue });
  }

  filterChange(changeEvent: any) {
    if (changeEvent?.target?.checked) {
      this.props.onFilterChange(changeEvent?.target?.name);
    } else {
      this.props.onFilterDelete(changeEvent?.target?.name);
    }

    this.forceUpdate();
  }

  render() {
    const { filter, filtersState } = this.props;
    let htmlForOptions;

    if (filter.type === 'slider') {
      htmlForOptions = <Slider
        // @ts-ignore
        min={filter.options.min}
        // @ts-ignore
        max={filter.options.max}
        value={this.state.sliderValue}
        onChange={(event, value) => this.handleChange(value as [number, number])}
        valueLabelDisplay='auto'
        aria-labelledby='range-slider'
      />
    }

    if (filter.type === 'selector') {
      htmlForOptions = filter.options.map((option, checkboxIndex) => (
        <FormControlLabel
          className='gfinder-single-filter-option'
          key={checkboxIndex}
          control={
            <Checkbox name={String(option)}
                      checked={filtersState[option] || false}
                      onChange={this.filterChange.bind(this)} />
          }
          label={option}
        />
      ));
    }

    return(
      <Accordion elevation={3}>
        <AccordionSummary expandIcon={'^'}>
          <div className='gfinder-filter-label'>{ filter.name }</div>
        </AccordionSummary>
        <Divider/>
        <AccordionDetails>
          <FormGroup style={{ width: '100%' }}>
            {htmlForOptions}
          </FormGroup>
        </AccordionDetails>
      </Accordion>
    )
  }
}
