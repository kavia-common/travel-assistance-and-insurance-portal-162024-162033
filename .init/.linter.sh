#!/bin/bash
cd /home/kavia/workspace/code-generation/travel-assistance-and-insurance-portal-162024-162033/travel_assistance_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

