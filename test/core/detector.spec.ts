import fs from 'fs';
import os from 'os';
import path from 'path';
import { describe, it, expect } from 'vitest';
import { detectFrameworks } from '../../src/core/detector';

function withTempProject(run: (projectRoot: string) => void): void {
    const projectRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'tc-detector-'));
    try {
        run(projectRoot);
    } finally {
        fs.rmSync(projectRoot, { recursive: true, force: true });
    }
}

describe('detectFrameworks - Jest', () => {
    it('detects a Jest config file', () => {
        withTempProject((projectRoot) => {
            fs.writeFileSync(path.join(projectRoot, 'jest.config.js'), 'module.exports = {};', 'utf-8');

            const detected = detectFrameworks(projectRoot);
            expect(detected).toContainEqual({ framework: 'jest', testDir: '.', confidence: 'high' });
        });
    });

    it('detects Jest from package.json dependencies', () => {
        withTempProject((projectRoot) => {
            fs.writeFileSync(
                path.join(projectRoot, 'package.json'),
                JSON.stringify({ devDependencies: { jest: '^30.0.0' } }),
                'utf-8',
            );

            const detected = detectFrameworks(projectRoot);
            expect(detected).toContainEqual({ framework: 'jest', testDir: './tests', confidence: 'medium' });
        });
    });
});

describe('detectFrameworks - pytest', () => {
    it('detects pytest.ini', () => {
        withTempProject((projectRoot) => {
            fs.writeFileSync(path.join(projectRoot, 'pytest.ini'), '[pytest]\nmarkers = smoke\n', 'utf-8');

            const detected = detectFrameworks(projectRoot);
            expect(detected).toContainEqual({ framework: 'pytest', testDir: '.', confidence: 'high' });
        });
    });

    it('detects pytest settings in pyproject.toml', () => {
        withTempProject((projectRoot) => {
            fs.writeFileSync(path.join(projectRoot, 'pyproject.toml'), '[tool.pytest.ini_options]\n', 'utf-8');

            const detected = detectFrameworks(projectRoot);
            expect(detected).toContainEqual({ framework: 'pytest', testDir: '.', confidence: 'high' });
        });
    });

    it('does not treat unrelated pyproject.toml files as pytest', () => {
        withTempProject((projectRoot) => {
            fs.writeFileSync(path.join(projectRoot, 'pyproject.toml'), '[project]\nname = "app"\n', 'utf-8');

            const detected = detectFrameworks(projectRoot);
            expect(detected.map((result) => result.framework)).not.toContain('pytest');
        });
    });
});

describe('detectFrameworks - JVM build files', () => {
    it('detects JUnit dependencies in Maven pom.xml', () => {
        withTempProject((projectRoot) => {
            fs.writeFileSync(
                path.join(projectRoot, 'pom.xml'),
                [
                    `<project>`,
                    `  <dependencies>`,
                    `    <dependency>`,
                    `      <groupId>org.junit.jupiter</groupId>`,
                    `      <artifactId>junit-jupiter</artifactId>`,
                    `    </dependency>`,
                    `  </dependencies>`,
                    `</project>`,
                ].join('\n'),
                'utf-8',
            );

            const detected = detectFrameworks(projectRoot);
            expect(detected).toContainEqual({ framework: 'junit', testDir: './tests', confidence: 'medium' });
        });
    });

    it('detects TestNG dependencies in Gradle files', () => {
        withTempProject((projectRoot) => {
            fs.writeFileSync(
                path.join(projectRoot, 'build.gradle'),
                `dependencies { testImplementation 'org.testng:testng:7.11.0' }`,
                'utf-8',
            );

            const detected = detectFrameworks(projectRoot);
            expect(detected).toContainEqual({ framework: 'testng', testDir: './tests', confidence: 'medium' });
        });
    });
});
