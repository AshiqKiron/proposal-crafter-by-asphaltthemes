import Select from 'react-select';
import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';

const Wrapper = styled.div`
    input {
        min-height: 14px !important;

        &:focus {
            outline: none;
            box-shadow: none;
            border-color: transparent;
        }
    }

    div[class$="-indicatorContainer"] {
        padding: 3px 5px;
    }
   
`

export const SearchableSelect = (props) => {
    const theme = useTheme();

    const customStyles = {
        control: (provided, state) => ({
            ...provided,
            borderColor: state.isFocused ? theme.colors.primary : theme.colors.grey200,
            boxShadow: 'none',
            borderRadius: theme.radius.md || '6px',
            padding: '2px', // React select has internal padding, adjusting to match others
            backgroundColor: '#fff', // Keep background white even when disabled
            fontFamily: theme.fonts.inter,
            fontSize: '13px',
            minHeight: '40px', // Match standard input height usually around 40px
            pointerEvents: state.isDisabled ? 'none' : 'auto', // Disable click events
            '&:hover': {
                borderColor: state.isFocused ? theme.colors.primary : theme.colors.grey200,
            },
        }),
        placeholder: (provided) => ({
            ...provided,
            color: '#94A3B8',
            fontFamily: theme.fonts.inter,
            fontSize: '13px',
            lineHeight: '1',
        }),
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isSelected ? theme.colors.primary : state.isFocused ? '#F8FAFC' : null,
            color: state.isSelected ? '#fff' : theme.colors.dark,
            fontFamily: theme.fonts.inter,
            fontSize: '13px',
            cursor: 'pointer',
            ':active': {
                backgroundColor: theme.colors.primary,
            },
        }),
        singleValue: (provided) => ({
            ...provided,
            color: theme.colors.dark,
            fontFamily: theme.fonts.inter,
            fontSize: '13px',
            lineHeight: '1',
        }),
        menu: (provided) => ({
            ...provided,
            zIndex: 9999,
            borderRadius: theme.radius.md || '6px',
            border: `1px solid ${theme.colors.grey200}`,
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        }),
    };

    return (
        <Wrapper>
            <Select
                styles={customStyles}
                isSearchable
                {...props}
            />
        </Wrapper>
    );
};
