import React, { useState } from 'react';
import S from './style';
import { MemInfo, TempFormData } from './types';

type Props = {
    data: MemInfo;
    tempFormData: TempFormData;
    setTempFormData: React.Dispatch<React.SetStateAction<TempFormData>>;
};

const FormFieldComponent: React.FunctionComponent<Props> = ({ data, tempFormData, setTempFormData }): JSX.Element => {
    const { fieldName, value } = data;

    // 생년월일 파싱
    const yearMonDay: string[] = [ "년 ", "월 ", "일 " ];
    const valueByType = fieldName === "생년월일" 
                    ? tempFormData[value].split("-").reduce((prev: string, current: string, index: number): string => prev + current + yearMonDay[index], "") 
                    : tempFormData[value];
    
    // 수정 상태
    const [ isEdited, setIsEdited ] = useState<boolean>(false);
    const handleEdited = (): void => {
        setIsEdited(!isEdited);
    };

    // 수정 입력필드 상태
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTempFormData(
            {
                ...tempFormData,
                [value]: e.target.value
            }
        );
    };

    return (
        <S.FieldTr>
            <th>{fieldName}</th>
            <td>
                {
                    isEdited ?
                    (
                        <S.FieldEditValue type="text" value={tempFormData[value]} onChange={handleChange} />
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
