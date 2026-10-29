import { describe, it, expect } from "vitest";
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";

const projectRoot = process.cwd();
const dataPath = path.join(projectRoot, "js", "data.js");

function loadCardData() {
    const source = fs.readFileSync(dataPath, "utf8");

    const context = vm.createContext({});

    vm.runInContext(
        source + `
            globalThis.testData = {
                CARDS,
                SUPPORT_CARDS,
                IMAGES
            };
        `,
        context
    );

    return context.testData;
}

describe("AtuaTCG card data", () => {
    const data = loadCardData();

    it("contains cards", () => {
        expect(data.CARDS.length).toBeGreaterThan(0);
        expect(data.SUPPORT_CARDS.length).toBeGreaterThan(0);
    });

    it("has unique card IDs", () => {
        const ids = [
            ...data.CARDS,
            ...data.SUPPORT_CARDS
        ].map(card => card.id);

        expect(new Set(ids).size).toBe(ids.length);
    });

    it("has the required information on every Atua card", () => {
        for (const card of data.CARDS) {
            expect(card.id, "Card ID").toBeTruthy();
            expect(card.name, `Name for ${card.id}`).toBeTruthy();
            expect(card.epithet, `Epithet for ${card.id}`).toBeTruthy();
            expect(card.art, `Artwork for ${card.id}`).toBeTruthy();
        }
    });

    it("maps every image-based card to an existing image file", () => {
        for (const card of data.CARDS) {
            if (card.art.type === "image") {
                const imagePath = data.IMAGES[card.art.src];

                expect(
                    imagePath,
                    `Missing image mapping for ${card.name}`
                ).toBeTruthy();

                expect(
                    fs.existsSync(path.join(projectRoot, imagePath)),
                    `Image file missing for ${card.name}: ${imagePath}`
                ).toBe(true);
            }
        }
    });
});