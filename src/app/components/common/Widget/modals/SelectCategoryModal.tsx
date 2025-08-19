'use client';
import Modal from '@/app/components/base/modal';
import { useToastContext } from '@/app/components/base/toast';
import { useAppContext } from '@/context/app-context';
import { CategoryModels } from '@/utils/constant';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { FC, useEffect, useState } from 'react';

export type IModalProps = {
    data?: any;
    onCancel: () => void;
    onSave: (newExtension: any) => void;
};

const SelectCategoryModal: FC<IModalProps> = ({ data, onCancel, onSave }) => {
    // const { t } = useTranslation()
    const { notify } = useToastContext();
    const appContext = useAppContext();

    const [localeData, setLocaleData] = useState({ ...data });
    const [categorys, setCategorys] = useState<any>([]);

    useEffect(() => {
        if (appContext && appContext.userProfile?.aienglish_feature_list) {
            const aienglish_feature_list = appContext.userProfile?.aienglish_feature_list;
            CategoryModels.map((model) => {
                if (aienglish_feature_list.includes(model.value)) {
                    setCategorys((pre: any) => [...pre, model]);
                }
            });
        }
    }, [appContext]);

    const handleValueChange = (value: Record<string, string>) => {
        setLocaleData({
            ...localeData,
            ...value
        });
    };

    // const handleDataChange = (type: string, value: string) => {
    //     setLocaleData({ ...localeData, [type]: value })
    // }

    const submit = async () => {
        // let res: ApiBasedExtension = {}
        // if (!data.id) {
        //     res = await addApiBasedExtension({
        //         url: '/api-based-extension',
        //         body: localeData,
        //     })
        // }

        const formData = localeData;
        onSave(formData);
    };

    // Generate a pastel background color based on category
    const getCategoryColor = (category: string | undefined) => {
        const colors = {
            essay: 'bg-blue-100 text-blue-800',
            comprehension: 'bg-green-100 text-green-800',
            speaking_conversation: 'bg-purple-100 text-purple-800',
            speaking_essay: 'bg-violet-100 text-violet-800',
            sentence_builder: 'bg-orange-100 text-orange-800',
            speaking_pronunciation: 'bg-pink-100 text-pink-800'
        };

        return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800';
    };

    return (
        <>
            <Modal
                isShow
                onClose={() => {}}
                wrapperClassName="z-40"
                className="relative !max-w-[480px] px-8"
            >
                <div className="absolute right-4 top-4 p-2 cursor-pointer" onClick={onCancel}>
                    <XMarkIcon className="w-4 h-4 text-gray-500" />
                </div>
                <div className="mb-4 font-semibold text-xl leading-[30px] text-gray-900">
                    {'Choose a bot to create assignment'}
                </div>
                <div className="mb-4">
                    {categorys.map((cate: any, index: number) => {
                        return (
                            <div
                                key={index}
                                className="flex mb-2 flex-row items-center  border bg-white rounded-md p-2 cursor-pointer"
                                onClick={() => {
                                    onSave(cate);
                                }}
                            >
                                <div className="flex-0 mr-4 shrink-0 relative w-10 h-10 ">
                                    <div
                                        className={`flex items-center justify-center w-full h-full rounded-full ${getCategoryColor(cate.value)} border-[0.5px] border-black/5 text-xl`}
                                    >
                                        {cate?.icon || '🤖'}
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <div className="text-xl font-medium leading-[20px] text-gray-900">
                                        {cate?.name}
                                    </div>
                                    <div className="mt-2 text-sm font-medium leading-[20px] text-gray-500  break-words">
                                        {cate?.description}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </Modal>
        </>
    );
};

export default SelectCategoryModal;
