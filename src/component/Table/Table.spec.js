import React from "react";
import {shallow, mount} from "enzyme";
import Table from "./Table";

describe('The Table Component', () => {
    it('should render the empty text', () => {
        const emptyText ='eeeempty';
        const wrapper = shallow(<Table data={[]} header={[]} emptyText={emptyText}/>);
        expect(wrapper.childAt(0).childAt(1).text()).toEqual(emptyText);
    });

    it('should pass correct mobileWidth', () => {
        const mobileWidth = 123;
        const wrapper = mount(<Table data={[]} header={[]} mobileWidth={mobileWidth}/>);
        expect(wrapper.find('.table').childAt(0).prop('mobileWidth')).toBe(mobileWidth);
        expect(wrapper.find('Header').prop('mobileWidth')).toBe(mobileWidth);
        expect(wrapper.find('Body').prop('mobileWidth')).toBe(mobileWidth);
    });

    it('should calculate the correct page count', () => {
        const wrapper = shallow(<Table data={[1,2,3,5,6,7,8]} header={[]} itemsPerPage={3}/>);
        expect(wrapper.find('Pagination').prop('count')).toBe(3);
    });
});