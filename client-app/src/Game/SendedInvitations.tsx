import { observer } from "mobx-react-lite";
import { Item, Segment } from "semantic-ui-react";

interface Props {
    nameRecipient: string;
}

export default observer(function SendedInvitations({ nameRecipient }: Props) {
    return (
        <Segment.Group>
            <Segment size={"mini"} >
                <Item.Group>
                    <Item >
                        <Item.Content>
                            <Item.Header>
                                {nameRecipient}
                            </Item.Header >
                        </Item.Content>
                    </Item>
                </Item.Group>
            </Segment>
        </Segment.Group>
    )
})