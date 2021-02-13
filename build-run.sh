#!/usr/bin/env python3
/usr/local/bin/yarn workspace frontend build
/usr/local/bin/yarn workspace backend clean
/usr/local/bin/yarn workspace backend build
/usr/local/bin/yarn workspace backend start-prod

