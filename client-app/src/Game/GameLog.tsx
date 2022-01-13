import { observer } from "mobx-react-lite";
import { Segment } from "semantic-ui-react";
import { useStore } from "../stores/store";
import { point } from "./Models/point";

export default observer(function GameLog() {

    const { signalRStore, userStore } = useStore();

    return (
        <>
            <Segment>
                <h2>Ход игры:</h2>
                {signalRStore.firedPoints.map((row: point) => (
                    row.creator === userStore.currentUser?.login || row.attackUser === userStore.currentUser?.login
                        ? (
                            <>
                                <ul>
                                    <li>
                                        <h4></h4>Игрок <strong>{row.attackUser}</strong> выстрелил по {row.x}:{row.y}: {row.result}
                                    </li>
                                </ul>
                            </>
                        ) : (<></>)
                ))}
            </Segment>
        </>
    )
})