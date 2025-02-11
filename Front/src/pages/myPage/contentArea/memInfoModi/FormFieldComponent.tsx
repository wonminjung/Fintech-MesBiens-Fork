import React, { useCallback, useState } from 'react';
import S from './style';
import { MemInfo } from './types';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../modules/store/store';

type Props = {
    data: MemInfo;
};

const FormFieldComponent: React.FunctionComponent<Props> = ({ data }): JSX.Element => {
    const { member } = useSelector((state: RootState) => state.user);
    const { fieldName, value } = data;

    // 생년월일 파싱
    const yearMonDay: string[] = [ "년 ", "월 ", "일 " ];
    const valueByType = fieldName === "생년월일" && typeof member[value] === "string" 
                    ? (member[value] as string).split("-").reduce((prev: string, current: string, index: number): string => prev + current + yearMonDay[index], "") 
                    : member[value];
    
    // 수정 상태
    const [ isEdited, setIsEdited ] = useState<boolean>(false);
    const handleEdited = useCallback((): void => {
        setIsEdited((prevState) => !prevState);
    }, []);

    // 수정 입력필드 상태
    const [ inputValue, setInputValue ] = useState<string | number>(member[value]);
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

export default FormFieldComponent;
