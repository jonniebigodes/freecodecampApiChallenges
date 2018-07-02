import React from 'react';
import TimeInfo from '../../src/components/Timeinfo';

describe('<TIMEINFO> is going to load',()=>{
    test('renders the component',()=>{
        const timewrapper= shallow(<TimeInfo/>);
        expect(timewrapper.find('div').exists()).toBe(true);
        timewrapper.unmount();
    })
});
// error state
describe('renders timeinfo',()=>{
    test('renders the component error message',()=>{
        const wrapperError=shallow(<TimeInfo/>);
        wrapperError.setState({isError:true});
        expect(wrapperError.find('ErrorView')).toBeDefined();
        wrapperError.unmount();
    })
});
//
// has info assigned
describe('renders timeinfo',()=>{
    test('renders the component error message',()=>{
        const wrapperDateInfo=shallow(<TimeInfo/>);
        wrapperDateInfo.setState({converted:{NaturalDate:'20/03/2018',unixTimeStamp:11111}});
        expect(wrapperDateInfo.find('parsedDate')).toBeDefined();
        expect(wrapperDateInfo.text()).toContain('Example response:Natural Date is: 20/03/2018TimeStamp is:11111')
        wrapperDateInfo.unmount();
    })
});
//