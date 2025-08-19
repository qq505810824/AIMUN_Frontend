import { Button, Spinner } from 'react-bootstrap';

interface ViewProps {
    btnName?: string;
    disabled: boolean;
    handleClick: any;
}
export default function LoadButton(props: ViewProps) {
    const { btnName, disabled, handleClick } = props;

    return (
        <>
            <Button
                className="w-full sm:w-fit  rounded-lg bg-violet-600 hover:bg-violet-700"
                disabled={disabled}
                onClick={handleClick}
            >
                {disabled && (
                    <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                    />
                )}
                {btnName || 'Run'}
            </Button>
        </>
    );
}
