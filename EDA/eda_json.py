import json
import pandas as pd
import plotly.express as px

# Load data from 'salesEDA.json' file
with open('salesEDA.json') as f:
    data = json.load(f)

# Create DataFrame from the loaded data
df = pd.DataFrame(data).T

# Set 'unique_bc_id' column as the DataFrame index
df['unique_bc_id'] = df.index