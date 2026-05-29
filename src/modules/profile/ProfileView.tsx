'use client';

import React, { useMemo, useState } from 'react';
import { useIdentityProfile } from '../identity/identity.queries';
import { ThemeCssVariables } from '../theme/providers/ThemeCssVariables';
import { resolvePageTheme } from '../theme';
import {
  Badge,
  Button,
  Card,
  EmptyState,
  ErrorState,
  IdentityResultPanel,
  SectionHeader,
  Skeleton,
} from '../design-system';

function buildProfileTheme(dominantArchetype: string | null | undefined) {
  return resolvePageTheme({
    archetypeSlug: dominantArchetype ?? null,
    context: 'profile',
    intensity: dominantArchetype ? 'medium' : 'none',
    overlayStrategy: 'zeus-pilot',
  });
}

export function ProfileView() {
  const profileQuery = useIdentityProfile();
  const [ambientMotionEnabled, setAmbientMotionEnabled] = useState(true);
  const currentResult = profileQuery.data?.currentResult ?? null;
  const dominantArchetype = profileQuery.data?.currentResult?.dominantArchetype ?? null;
  const theme = useMemo(() => buildProfileTheme(dominantArchetype), [dominantArchetype]);
  const zeusPilotActive = dominantArchetype === 'zeus';

  const hasIdentity = Boolean(currentResult);

  return (
    <ThemeCssVariables theme={theme}>
      <section
        className={ambientMotionEnabled ? 'profile-shell profile-shell-ambient' : 'profile-shell'}
        data-archetype={dominantArchetype ?? 'xeorum-dark'}
        data-zeus-pilot={zeusPilotActive}
      >
        <div className="profile-atmosphere" aria-hidden="true" />
        <div className="section-stack profile-content">
          <SectionHeader kicker="Profile" title="Customer identity and account controls." />
          <div className="profile-toolbar">
            <Badge tone={dominantArchetype ? 'accent' : 'default'}>
              {dominantArchetype ? `Dominant archetype ${dominantArchetype.toUpperCase()}` : 'Base XEORUM dark theme'}
            </Badge>
            {zeusPilotActive ? <Badge tone="accent">Zeus pilot active</Badge> : null}
            <Button
              type="button"
              variant="ghost"
              aria-pressed={!ambientMotionEnabled}
              onClick={() => setAmbientMotionEnabled((value) => !value)}
            >
              {ambientMotionEnabled ? 'Ambient motion on' : 'Ambient motion off'}
            </Button>
          </div>
          {profileQuery.isLoading ? (
            <div className="profile-grid">
              <Card className="profile-panel">
                <Skeleton className="profile-skeleton-title" />
                <Skeleton className="profile-skeleton-line" />
                <Skeleton className="profile-skeleton-line" />
              </Card>
              <Card className="profile-panel">
                <Skeleton className="profile-skeleton-line" />
                <Skeleton className="profile-skeleton-line" />
                <Skeleton className="profile-skeleton-line" />
              </Card>
            </div>
          ) : null}
          {!profileQuery.isLoading && profileQuery.isError ? (
            <div className="profile-grid">
              <Card className="profile-panel">
                <h2>Profile</h2>
                <p>Your account surface remains available with the base XEORUM theme.</p>
                <ErrorState>Identity profile unavailable right now.</ErrorState>
              </Card>
              <Card className="profile-panel">
                <h2>Theme safety</h2>
                <p>No archetype overlay was required to keep this surface readable and stable.</p>
              </Card>
            </div>
          ) : null}
          {!profileQuery.isLoading && !profileQuery.isError ? (
            <div className="profile-grid">
              {hasIdentity ? (
                <IdentityResultPanel result={currentResult!} />
              ) : (
                <Card className="profile-panel">
                  <h2>Identity not resolved yet</h2>
                  <EmptyState>Run the identity test to unlock a subtle archetype atmosphere in this profile.</EmptyState>
                </Card>
              )}
              <Card className="profile-panel">
                <h2>Account overview</h2>
                <p>Saved identity, order history and recommendations will live here without changing the global XEORUM layout.</p>
                <ul className="profile-list">
                  <li>Theme fallback remains safe if profile or overlay data fails.</li>
                  <li>Ambient motion can be disabled without hiding content.</li>
                  <li>Checkout and legal remain more restrained than profile surfaces.</li>
                </ul>
              </Card>
            </div>
          ) : null}
        </div>
      </section>
    </ThemeCssVariables>
  );
}
