export const VERSION = 1;

export interface ISquare {
	piece?: IPiece;
	backgroundColor: ColorType;
	id: number;
	col: number;
	row: number;
}

export interface IBoardState {
	pieces: IPiece[];
}

export interface IPiece {
	pieceType: PieceType;
	colorType: ColorType;
	row: number;
	col: number;
}

export enum PieceType {
	bishop,
	knight,
	rook,
	king,
	queen,
	pawn,
}

export enum ColorType {
	black,
	white,
}
