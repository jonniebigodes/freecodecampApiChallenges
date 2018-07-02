import React from 'react';
import WhoAmi from '../../src/components/Whoami';
import Header from '../../src/components/Header';
import Footer from '../../src/components/Footer';

describe('<WHOAMI> is going to load',()=>{
    describe('render whoami',()=>{
        test('renders the component',()=>{
            const wrapper= shallow(<WhoAmi/>);
            expect(wrapper.find('div').exists()).toBe(true);
            wrapper.unmount();
        })
    });
    describe('render error state',()=>{
        test('sets error state and test if loads',()=>{
            const wrapperError=shallow(<WhoAmi/>);
            wrapperError.setState({isError:true});
            expect(wrapperError.find('ErrorView')).toBeDefined();
            wrapperError.unmount();
        })
    })
    describe('render full blown render info',()=>{
        test('tests info is present in render when loading ended',()=>{
            const wrapperdata=shallow(<WhoAmi/>);
            wrapperdata.setState(
                {
                    loading:false,
                    clientInfo:{
                        address:'192.168.1.1',
                        clientLanguage:'PT',
                        clientOsInfo:{
                            Windows:"10.0"
                        }
                    }
                }
            );
            expect(wrapperdata.find(Header).length).toBe(1);
            expect(wrapperdata.find('infoclient')).toBeDefined();
            expect(wrapperdata.find(Footer).length).toBe(1);
        });
    })
    
})