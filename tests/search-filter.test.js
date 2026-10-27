
import { describe, it, expect } from "vitest";
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";

const projectRoot = process.cwd();

function loadAppFunctions() {
    const dataSource = fs.readFileSync(
        path.join(projectRoot, "js", "data.js"),
        "utf8"
    );

    const appSource = fs.readFileSync(
        path.join(projectRoot, "js", "app.js"),
        "utf8"
    );

    const context = vm.createContext({
        console,
        Set
    });

    vm.runInContext(dataSource, context);

    const functionNames = [
        "matches",
        "searchHit",
        "supportMatches",
        "currentList",
        "sortCards"
    ];

    function extractFunction(name) {
        const start = appSource.indexOf(`function ${name}(`);

        if (start === -1) {
            throw new Error(`Could not find function ${name} in app.js`);
        }

        const openBrace = appSource.indexOf("{", start);
        let depth = 0;

        for (let i = openBrace; i < appSource.length; i++) {
            if (appSource[i] === "{") depth++;
            if (appSource[i] === "}") depth--;

            if (depth === 0) {
                return appSource.slice(start, i + 1);
            }
        }

        throw new Error(`Could not extract function ${name}`);
    }

    const functionsSource = functionNames
        .map(extractFunction)
        .join("\n");

    vm.runInContext(`
        const state = {
            filters: {
                types: new Set(),
                traits: new Set(),
                elements: new Set(),
                rarities: new Set()
            },
            query: "",
            sort: "number",
            tab: "atua",
            support: {
                kinds: new Set(),
                origins: new Set(),
                conditions: new Set()
            }
        };

        ${functionsSource}

        globalThis.testAPI = {
            state,
            matches,
            searchHit,
            supportMatches,
            currentList,
            sortCards,
            CARDS,
            SUPPORT_CARDS
        };
    `, context);

    return context.testAPI;
}

describe("AtuaTCG search and filtering", () => {
    it("returns Atua cards when no filters are selected", () => {
        const api = loadAppFunctions();

        expect(api.currentList().length).toBe(api.CARDS.length);
    });

    it("filters Atua cards by type", () => {
        const api = loadAppFunctions();
        const firstCard = api.CARDS[0];

        api.state.filters.types.add(firstCard.supertype);

        const results = api.currentList();

        expect(results.length).toBeGreaterThan(0);

        for (const card of results) {
            expect(card.supertype).toBe(firstCard.supertype);
        }
    });

    it("searches Atua cards without case sensitivity", () => {
        const api = loadAppFunctions();
        const card = api.CARDS.find(card => card.name);

        api.state.query = card.name.toUpperCase();

        expect(api.currentList().some(result => result.id === card.id))
            .toBe(true);
    });

    it("sorts cards by number by default", () => {
        const api = loadAppFunctions();
        const results = api.sortCards([...api.CARDS]);

        const numbers = results.map(card => card.number);

        expect(numbers).toEqual(
            [...numbers].sort((a, b) => a - b)
        );
    });

    it("returns support cards on the support tab", () => {
        const api = loadAppFunctions();

        api.state.tab = "support";

        expect(api.currentList().length).toBe(api.SUPPORT_CARDS.length);
    });
});
