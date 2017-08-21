const rules = {
    isRequired: (value) => {
        return !!value;
    },
    maxLength: (value, maxLength) => {
        return (!value || value.length <= maxLength);
    },
    equals: (value, condition) => {
        return value === condition;
    }
};
export default rules;