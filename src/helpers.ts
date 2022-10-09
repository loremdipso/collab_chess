import { IBoardState, PieceType, ColorType, ISquare } from "./interfaces";
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

// export function calculateLinkUrl(targetPlayer: IPlayer): string {
// 	const url = new URL(location.pathname, location.href).href;
// 	const clean = cleanedObject(targetPlayer);
// 	const data = encrypt(clean);
// 	return `${url}?secret=${encodeURIComponent(data)}`;
// }

// export function decodeLinkUri(uri: string): IPlayer {
// 	const data = decrypt(decodeURIComponent(uri));
// 	return data;
// }

export function generateSquares(boardState: IBoardState): ISquare[] {
	let squares: ISquare[] = [];
	let id = 0;
	for (let i = 0; i < 8; i++) {
		for (let j = 0; j < 8; j++) {
			let square: ISquare = {
				id,
				backgroundUrl: "",
				backgroundColor:
					id % 2 === 0 ? ColorType.white : ColorType.black,
			};

			let match = boardState.pieces.find(
				(piece) => piece.row === i && piece.col === j
			);
			if (match) {
				square.backgroundUrl = getPieceIcon(
					match.pieceType,
					match.colorType
				);
			}
			squares.push(square);
			id += 1;
		}

		id += 1; // offset by 1 every row
	}
	return squares;
}

export function encodeBoardState(boardState: IBoardState): string {
	return "TODO";
}

export function decodeBoardState(uri: string): IBoardState {
	return {
		pieces: [],
	};
}

export function getDefaultBoardState(): IBoardState {
	return {
		pieces: [
			{
				pieceType: PieceType.bishop,
				colorType: ColorType.black,
				row: 0,
				col: 0,
			},
		],
	};
}

export function getPieceIcon(piece: PieceType, color: ColorType) {
	const colorString = getColorString(color);
	const pieceString = getPieceString(piece);
	return `https://images.chesscomfiles.com/chess-themes/pieces/neo/150/${colorString}${pieceString}.png`;
	// return `url('https://images.chesscomfiles.com/chess-themes/pieces/neo/150/${colorString}${pieceString}.png')`;
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
			return "k";
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
		case "k":
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
