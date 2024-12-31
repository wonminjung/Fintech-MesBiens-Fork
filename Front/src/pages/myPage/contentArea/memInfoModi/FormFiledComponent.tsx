import React, { Dispatch, SetStateAction, useCallback, useState } from 'react';
import S from './style';
import { Info,  } from './types';

type Props = {
    info: Info;
    index: number;
};

const FormFiledComponent: React.FunctionComponent<Props> = ({ info, index }): JSX.Element => {
    const { fieldName, value } = info;
    const valueByType = typeof value === "object" ? `${value.first}년 ${value.second}월 ${value.third}일` : value;
    
    // 수정 상태
    const [ isEdited, setIsEdited ] = useState<boolean>(false);
    const handleEdited = useCallback((): void => {
        setIsEdited((prevState) => !prevState);
    }, []);

    // 수정 입력필드 상태
    const [ inputValue, setInputValue ] = useState<string>(valueByType);
    const inputOnChange = useCallback((e: React.ChangeEvent<HTMLInputElement>): void => {
        setInputValue(() => e.target.value);
    }, []);

    return (
        <S.FieldTr>
            <th>{fieldName}</th>
            <td>
                {
                    isEdited ? 
                    (
                        <S.FieldEditValue type="text" value={inputValue} onChange={inputOnChange} />
                    )
                    :
                    (
                        <S.FieldExistValue>{valueByType}</S.FieldExistValue>
                    )
                }
                <S.FieldEditButton type="button" onClick={handleEdited} data-editsuccess={isEdited}>
                    { isEdited ? "완료" : "수정" }
                </S.FieldEditButton>
            </td>
        </S.FieldTr>
    );
};

export default FormFiledComponent;
