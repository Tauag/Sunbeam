import React from 'react';
import SearchForm from './SearchForm';
import { mount } from 'enzyme';

describe('Render and Value Tests for SearchForm', () => {
	var value = 'test';
	var testSubmit = false;
	var placeholder = 'test placeholder';
	function onChange(event) {
		value = event.target.value;
	}
	function onSubmit(e) {
		e.preventDefault();
		testSubmit = !testSubmit;
	}
	function clear() {
		value = '';
	}
	var wrapper = mount(
		<SearchForm
			value={value}
			placeholder={placeholder}
			onChange={onChange}
			onSubmit={onSubmit}
			onClear={clear}
		/>
	);

	test('Able to render SearchForm', () => {
		expect(wrapper.exists()).toBe(true);
	});

	test('Value and onChange is correct', () => {
		expect(wrapper.find('input').props().value).toBe(value);
		wrapper
			.find('input')
			.simulate('change', { target: { value: 'test change' } });
		expect(value).toBe('test change');
	});

	test('onSubmit is correct', () => {
		expect(testSubmit).toBe(false);
		wrapper.find('.search-form-submit').simulate('click');
		expect(testSubmit).toBe(true);
	});

	test('onClear is correct', () => {
		expect(value).not.toBe('');
		wrapper.find('form').simulate('click');
		wrapper.find('.search-form-clear>div').simulate('click');
		expect(value).toBe('');
	});
});
