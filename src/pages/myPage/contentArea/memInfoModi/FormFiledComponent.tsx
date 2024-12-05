import React, { useCallback, useState } from 'react';
import S from './style';
import { Info,  } from './types';

type Props = {
    info: Info;
    index: number;
};

const FormFiledComponent: React.FunctionComponent<Props> = ({ info, index }): JSX.Element => {
    const { fieldName, value } = info;
    const [ isEdited, setIsEdited ] = useState<boolean>(false);
    
    const handleEdited = useCallback((e:React.MouseEvent<HTMLButtonElement>): void => {
        setIsEdited((prevState) => !prevState);
    }, []);

    const onChange = () => {};

    const handleValue = typeof value === "object" ? `${value.first}년 ${value.second}월 ${value.third}일` : value

    
    return (
        <S.FieldTr>
            <th>{fieldName}</th>
            <td>
                {
                    isEdited ? 
                    (
                        <S.FieldEditValue type="text" value={handleValue} onChange={onChange}/>

                    )
                    :
                    (
                        <S.FieldExistValue>{typeof value === "object" ? `${value.first}년 ${value.second}월 ${value.third}일` : value}</S.FieldExistValue>
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
