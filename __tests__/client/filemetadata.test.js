import React from 'react';
import FileMetaInfo from '../../src/components/FileMetaData';

describe('<FileMetaInfo> is going to load',()=>{
    describe('renders timeinfo',()=>{
        test('renders the component',()=>{
            const timewrapper= shallow(<FileMetaInfo/>);
            expect(timewrapper.find('div').exists()).toBe(true);
            timewrapper.unmount();
        })
    })
});
 // error state
 describe('renders timeinfo',()=>{
    test('renders the component error message',()=>{
        const wrapperError=shallow(<FileMetaInfo/>);
        wrapperError.setState({isError:true});
        expect(wrapperError.find('ErrorView')).toBeDefined();
        wrapperError.unmount();
    })
});
//
describe('renders info',()=>{
    test('renders some file info',()=>{
        const wrapperinfo=shallow(<FileMetaInfo/>);
        wrapperinfo.setState({fileName:'aaaa',filetype:'jpeg',filesize:11111});
        expect(wrapperinfo.find('.fileChallenge')).toBeDefined();
        expect(wrapperinfo.text()).toContain('File aaaa is of type jpeg and is 11111 Kb long');
        wrapperinfo.unmount();
    })
});