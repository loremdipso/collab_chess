import {
	IBoardState,
	PieceType,
	ColorType,
	ISquare,
	IPiece,
} from "./interfaces";
import SimpleCrypto from "simple-crypto-js";

// we don't actually care about security, we just want some strings to not be
// human-readable
const simpleCrypto = new SimpleCrypto("not a real key");

export function encrypt(data: any): string {
	return simpleCrypto.encrypt(data);
}

export function decrypt(data: string): any {
	return simpleCrypto.decrypt(data) as string;
}

export function cleanedObject(data: any): any {
	let rv: any = {};
	for (let key in data) {
		if (
			data.hasOwnProperty(key) &&
			data[key] !== null &&
			data[key] !== undefined
		) {
			rv[key] = data[key];
		}
	}
	return rv;
}

export function calculateLinkUrl(boardState: IBoardState): string {
	const url = new URL(location.pathname, location.href).href;
	const clean = cleanedObject(boardState);
	const data = encrypt(clean);
	return `${url}?state=${encodeURIComponent(data)}`;
}

export function decodeBoardState(uri: string): IBoardState | null {
	if (!uri) {
		return null;
	}

	const data = decrypt(decodeURIComponent(uri));
	if (data && data.pieces) {
		return data as IBoardState;
	}

	return null;
}

export function generateSquares(boardState: IBoardState): ISquare[] {
	let squares: ISquare[] = [];
	let id = 0;
	for (let i = 0; i < 8; i++) {
		for (let j = 0; j < 8; j++) {
			let matchingPiece: IPiece | undefined = boardState.pieces.find(
				(piece) => piece.row === i && piece.col === j
			);
			let square: ISquare = {
				id,
				piece: matchingPiece,
				row: i,
				col: j,
				backgroundColor:
					id % 2 === 0 ? ColorType.white : ColorType.black,
			};
			squares.push(square);
			id += 1;
		}

		id += 1; // offset by 1 every row
	}
	return squares;
}

export function getDefaultBoardState(): IBoardState {
	let pieces: IPiece[] = [];
	let color = ColorType.black;
	let pieceTypes = [
		PieceType.rook,
		PieceType.knight,
		PieceType.bishop,
		PieceType.queen,
		PieceType.king,
		PieceType.bishop,
		PieceType.knight,
		PieceType.rook,
	];

	let row = 0;
	let col = 0;
	for (let pieceType of pieceTypes) {
		pieces.push({
			pieceType,
			colorType: color,
			row,
			col,
		});
		col += 1;
	}

	row = 1;
	for (let col = 0; col < 8; col++) {
		pieces.push({
			pieceType: PieceType.pawn,
			colorType: color,
			row,
			col,
		});
	}

	color = ColorType.white;
	row = 6;
	for (let col = 0; col < 8; col++) {
		pieces.push({
			pieceType: PieceType.pawn,
			colorType: color,
			row,
			col,
		});
	}

	row = 7;
	col = 0;
	for (let pieceType of pieceTypes) {
		pieces.push({
			pieceType,
			colorType: color,
			row,
			col,
		});
		col += 1;
	}

	return {
		pieces,
	};
}

export function getPieceIcon(piece: IPiece) {
	const colorString = getColorString(piece.colorType);
	const pieceString = getPieceString(piece.pieceType);
	return `https://images.chesscomfiles.com/chess-themes/pieces/neo/150/${colorString}${pieceString}.png`;
}

function getColorString(color: ColorType): string {
	return color === ColorType.black ? "b" : "w";
}

function getColorType(color: string): ColorType {
	return color === "b" ? ColorType.black : ColorType.white;
}

function getPieceString(piece: PieceType): string {
	switch (piece) {
		case PieceType.bishop:
			return "b";
		case PieceType.knight:
			return "n";
		case PieceType.rook:
			return "r";
		case PieceType.king:
			return "k";
		case PieceType.queen:
			return "q";
		case PieceType.pawn:
			return "p";
		default:
			throw `Unknown piece ${piece}`;
	}
}

function getPieceType(piece: string): PieceType {
	switch (piece) {
		case "b":
			return PieceType.bishop;
		case "n":
			return PieceType.knight;
		case "r":
			return PieceType.rook;
		case "k":
			return PieceType.king;
		case "q":
			return PieceType.queen;
		case "p":
			return PieceType.pawn;
		default:
			throw `Unknown piece ${piece}`;
	}
}
