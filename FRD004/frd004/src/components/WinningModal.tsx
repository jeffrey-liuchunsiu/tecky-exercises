import { Button, Form, Modal } from "react-bootstrap"
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { resetBoard } from "../redux/games/gameSlice"
import { addRecord } from "../redux/scores/scoreSlice"
import { RootType } from "../redux/store"


interface IWinningModalProps {
    winner: string
}

interface IWinningModalForm {
    name: string
    email: string
    gender: string
}

export default function WinningModal(props: IWinningModalProps) {
    const squares = useSelector((state: RootType) => state.game.squares);
    const { register, handleSubmit } = useForm<IWinningModalForm>({
        defaultValues: {
            name: "james",
            email: "james@tecky.io",
            gender: ""
        }
    });

    const dispatch = useDispatch();

    const onSubmit = (data: IWinningModalForm) => {
        dispatch(addRecord({
            squares,
            name: data.name,
            email: data.email,
            winner: props.winner
        }));
        dispatch(resetBoard())
    }

    const isShowModal = () => {
        return !!props.winner
    }

    return (
        <Modal isOpen={isShowModal()}>
            <Modal.Header>Congratulations!</Modal.Header>
            <Modal.Body>
                Congratulations! {props.winner} win the Game !!
                Please input your name and email here!!
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <label>
                        Name:
                        <input type='text' {...register('name')} />
                    </label>
                    <label>
                        Email
                        <input type='email' {...register("email")} />
                    </label>

                    <input type='submit' value="Submit" />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button color="primary">Save Score and Play Again!</Button>
            </Modal.Footer>
        </Modal>
    )
}