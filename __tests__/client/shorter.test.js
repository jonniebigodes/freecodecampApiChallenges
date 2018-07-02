import React from 'react';
import UrlShort from '../../src/components/UrlShort';

describe('<UrlShort> is going to load',()=>{
    test('renders the component',()=>{
        const wrapper= shallow(<UrlShort/>);
        expect(wrapper.find('div').exists()).toBe(true);
        wrapper.unmount();
    });
});
describe('renders <UrlShort> error',()=>{
    test('renders the component error message',()=>{
        const wrapperError=shallow(<UrlShort/>);
        wrapperError.setState({isError:true});
        expect(wrapperError.find('ErrorView')).toBeDefined();
        wrapperError.unmount();
    })
});
describe('renders <UrlShort> with data',()=>{
    test('renders the component error message',()=>{
        const wrapperUrl=shallow(<UrlShort/>);
        wrapperUrl.setState(
            {
                shortData:"https://localhost:5000/api/short/22",
                original_url:'https:www.nerdist.com'
            }
        );
        expect(wrapperUrl.find('urlsubmission')).toBeDefined();
        wrapperUrl.unmount();
    })
})