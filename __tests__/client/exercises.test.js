import React from 'react';
import Exercises from '../../src/components/Exercises';

describe('<Exercises> is going to load',()=>{
    test('renders the component',()=>{
        const timewrapper= shallow(<Exercises/>);
        expect(timewrapper.find('div').exists()).toBe(true);
        timewrapper.unmount();
    })
});
// error state
describe('renders Exercises error message',()=>{
    test('renders the component error message',()=>{
        const wrapperError=shallow(<Exercises/>);
        wrapperError.setState({isError:true});
        expect(wrapperError.find('ErrorView')).toBeDefined();
        wrapperError.unmount();
    })
});
//
// error state
describe('renders Exercises exercise creation ok',()=>{
    test('renders the component exercise success ',()=>{
        const wrapperExOK=shallow(<Exercises/>);
        wrapperExOK.setState({isError:true});
        expect(wrapperExOK.find('ExerciseOK')).toBeDefined();
        wrapperExOK.unmount();
    })
});
//