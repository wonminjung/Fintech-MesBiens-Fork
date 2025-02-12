import React, { useState } from 'react';
import S from './style';
import FormFieldComponent from './FormFieldComponent';
import { MemInfo, TempFormData } from './types';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../modules/store/store';

const MemInfoModiComponent: React.FunctionComponent = ():JSX.Element => {
    const fieldMap: MemInfo[] = [
        {
            fieldName: "이름",
            value: "memberName"
        },
        {
            fieldName: "이메일",
            value: "memberEmail"
        },
        {
            fieldName: "핸드폰번호",
            value: "memberPhone"
        },
        {
            fieldName: "주소",
            value: "memberAddress"
        },
        {
            fieldName: "생년월일",
            value: "memberBirth"
        }
    ];
    
    const { member } = useSelector((state: RootState) => state.user);
    const [ tempFormData, setTempFormData ] = useState<TempFormData>(
        {
            memberName: member.memberName,
            memberEmail: member.memberEmail,
            memberPhone: member.memberPhone,
            memberAddress: member.memberAddress,
            memberBirth: member.memberBirth
        }
    );

    // 임시용 (백엔드 API 완성되면 끝낼 예정)
    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        
        console.log(tempFormData);

        // const fetchData = async () => {
        //     const response: Response = await fetch(`${process.env.REACT_APP_SERVER_URL}/`, 
        //         {
        //             method: "POST",
        //             headers: {
        //                 "Content-Type": "application/json; charset=UTF-8"
        //             },
        //             body: JSON.stringify(tempFormData)
        //         }
        //     );
        //     const data: any = await response.json();

        //     return { data, response };
        // };

        // fetchData()
        // .then(({ data, response }) => {
        //     if(response.ok || response.status === 200) {

        //     }
        // })
        // .catch(() => {});
    };

    return (
        <S.FormField method="post">
            <S.FieldWrapper>
                <S.FieldTitle>기본 정보</S.FieldTitle>

                <S.FieldTable>
                    <tbody>
                        {fieldMap.map((data: MemInfo, i: number): JSX.Element => (
                            <FormFieldComponent key={i} data={data} tempFormData={tempFormData} setTempFormData={setTempFormData}/>
                        ))}
                    </tbody>
                </S.FieldTable>
                <S.EditBtnContainer>
                    <S.EditBtn onClick={handleSubmit}>수정 완료</S.EditBtn>
                </S.EditBtnContainer>
            </S.FieldWrapper>
        </S.FormField>
    );
};

export default MemInfoModiComponent;