import { createBoard } from '@wixc3/react-board';
import { Login } from '../../../components/login_page/login_page';

export default createBoard({
    name: 'Login',
    Board: () => <Login />,
    isSnippet: true,
});