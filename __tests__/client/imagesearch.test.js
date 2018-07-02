import React from 'react';
import ImageInfo from '../../src/components/imgComponent';
import ImageItem from '../../src/components/ImageItem';

describe('<ImageInfo> is going to load',()=>{
    test('renders the component',()=>{
        const timewrapper= shallow(<ImageInfo/>);
        expect(timewrapper.find('div').exists()).toBe(true);
        timewrapper.unmount();
    })
});
 // error state
 describe('renders ImageInfo error',()=>{
    test('renders the component error message',()=>{
        const wrapperError=shallow(<ImageInfo/>);
        wrapperError.setState({isError:true});
        expect(wrapperError.find('ErrorView')).toBeDefined();
        wrapperError.unmount();
    })
});
//
// child items 
describe('renders ImageInfo',()=>{
    test('renders the component with a search',()=>{
        const wrapperData=shallow(<ImageInfo/>);
        wrapperData.setState({searchResult:[
            {
                name:'item1',
                link:'PropTypes.string',
                height:250,
                width:250,
                thumbHeight:250,
                thumbWidth:250,
                filesize:250
            },
            {
                name:'item2',
                link:'PropTypes.string',
                height:250,
                width:250,
                thumbHeight:250,
                thumbWidth:250,
                filesize:250
            },
            {
                name:'item3',
                link:'PropTypes.string',
                height:250,
                width:250,
                thumbHeight:250,
                thumbWidth:250,
                filesize:250
            }
        ]});
        expect(wrapperData.children().find(ImageItem).length).toEqual(3);
        // expect(wrapperData.find('imagesData')).toHaveLength(3)
        wrapperData.unmount();
    })
});
//