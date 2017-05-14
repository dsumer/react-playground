import React from "react";
import {shallow} from "enzyme";
import Table from "./Table";

describe('The Table Component', () => {
    it('should render the empty text.', () => {
        const emptyText ='eeeempty';
        const wrapper = shallow(<Table data={[]} header={[]} emptyText={emptyText}/>);
        expect(wrapper.childAt(0).childAt(1).text()).toEqual(emptyText);
    });
});