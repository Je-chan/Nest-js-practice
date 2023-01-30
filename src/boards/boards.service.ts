import { Board, BoardStatus } from './boards.model';
import { Injectable, NotFoundException } from '@nestjs/common';
import { v1 as uuid } from 'uuid';
import { CreateBoardDto } from './dto/create-board.dto';

@Injectable()
export class BoardsService {
  private boards: Board[] = [
    {
      id: '1',
      title: 'test',
      description: 'testDescription',
      status: BoardStatus.PUBLIC,
    },
  ];

  getAllBoards(): Board[] {
    return this.boards;
  }

  getBoardById(id: string): Board {
    const board = this.boards.find((board) => board.id === id);

    if (!board) {
      throw new NotFoundException(`${id} 에 해당하는 게시글이 없습니다`);
    }

    return board;
  }

  createBoard(createBoardDto: CreateBoardDto) {
    const { title, description } = createBoardDto;

    const board: Board = {
      id: uuid(),
      title,
      description,
      status: BoardStatus.PUBLIC,
    };

    this.boards.push(board);
    return board;
  }

  updateBoardStatus(id: string, status: BoardStatus): Board {
    const board = this.getBoardById(id);
    board.status = status;
    return board;
  }

  deleteBoard(id: string): void {
    const foundBoard = this.getBoardById(id);
    this.boards = this.boards.filter((board) => board.id !== foundBoard.id);
  }
}
