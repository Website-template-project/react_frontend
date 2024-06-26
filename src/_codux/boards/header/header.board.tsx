import { createBoard } from '@wixc3/react-board';
import { Header } from '../../../components/header/header';
import { ComponentWrapper } from '../../board-wrappers/component-wrapper';

export default createBoard({
    name: 'Header',
    Board: () => (
        <ComponentWrapper>
            <Header />
            <div>
                <li>Item</li>
                <li>Item</li>
            </div>
        </ComponentWrapper>
    ),
    isSnippet: true,
    environmentProps: {
        canvasMargin: {
            top: 1,
            right: 0,
            left: 0,
        },
        windowWidth: 1920,
        windowHeight: 1080,
    },
});
